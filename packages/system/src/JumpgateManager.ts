import * as grpc from '@grpc/grpc-js';
import { SystemConfiguration } from './Configuration';
import { Empty, JumpgateInfo, JumpgateStatus } from './proto/system';
import { SystemServerClient } from './proto/system.grpc-client';

export default class JumpgateManager {
  private _activeSystemConnections = new Map<string, SystemServerClient>();

  configuration: SystemConfiguration;

  constructor(configuration: SystemConfiguration) {
    this.configuration = configuration;
    setInterval(() => {
      console.log(`%o`, [...this._activeSystemConnections.keys()]);
    }, 5000);
  }

  async start() {
    return Promise.allSettled(
      this.configuration.jumpgates.map(({ ip, port }) =>
        this.connect(`${ip}:${port}`).catch(() => console.warn(`Unable to connect to ${ip}:${port}`))
      )
    );
  }

  async tryConnect(target: string): Promise<SystemServerClient | null> {
    return this.connect(target).catch(() => null);
  }

  async connect(target: string) {
    let client: SystemServerClient | undefined;
    if (this._activeSystemConnections.has(target)) {
      client = this._activeSystemConnections.get(target);
      try {
        if (!client) throw new Error('InconsistentData(ActiveSystemConnections)');
        await this._ping(client);
        return client;
      } catch (err) {
        console.log('Removing client %s', target);
        this._activeSystemConnections.delete(target);
        throw err;
      }
    }
    client = new SystemServerClient(target, grpc.ChannelCredentials.createInsecure(), {}, {});
    this._activeSystemConnections.set(target, client);

    try {
      console.log('Opening jumpgate to %s', target);
      const jumpgateInfo = await this._openJumpgate(client);
      if (jumpgateInfo.status === JumpgateStatus.Closed) {
        console.log('JumpgateOpeningError(closed)');
        throw new Error('JumpgateOpeningError(closed)');
      }
      if (jumpgateInfo.status === JumpgateStatus.Refused) {
        console.log('JumpgateOpeningError(refused)');
        throw new Error('JumpgateOpeningError(refused)');
      }
    } catch (err) {
      console.log('Removing client %s', target);
      this._activeSystemConnections.delete(target);
      console.dir(err);
      throw err;
    }
    return client;
  }

  private async _ping(client: SystemServerClient): Promise<Empty> {
    return new Promise(function (resolve, reject) {
      client.ping({}, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Pong');
          resolve({});
        }
      });
    });
  }

  private async _openJumpgate(client: SystemServerClient): Promise<JumpgateInfo> {
    const { ip, port, name } = this.configuration;
    return new Promise(function (resolve, reject) {
      client.openJumpgate({ ip, port, name }, (err, response) => {
        if (err || response?.status !== JumpgateStatus.Opened) {
          reject(err || response);
        } else {
          resolve(response);
        }
      });
    });
  }
}
