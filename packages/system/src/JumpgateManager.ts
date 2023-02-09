import * as grpc from '@grpc/grpc-js';
import { JumpgateOpeningResponse } from './proto/system';
import { SystemServerClient } from './proto/system.grpc-client';

export default class JumpgateManager {
  private _activeSystemConnections = new Map<string, SystemServerClient>();

  ip: string;
  port: number;
  name: string;

  constructor(ip: string, port: number, name: string) {
    this.ip = ip;
    this.port = port;
    this.name = name;
  }

  async tryConnect(target: string): Promise<SystemServerClient | null> {
    return this.connect(target).catch(() => null);
  }

  async connect(target: string) {
    let client: SystemServerClient | undefined;
    if (this._activeSystemConnections.has(target)) {
      client = this._activeSystemConnections.get(target);
      try {
        await this._ping(client);
        return client;
      } catch (err) {}
    }
    client = new SystemServerClient(target, grpc.ChannelCredentials.createInsecure(), {}, {});
    this._activeSystemConnections.set(target, client);

    try {
      console.log('Opening jumpgate to %s', target);
      const { accepted } = await this._openJumpgate(client);
      if (!accepted) {
        throw new Error('JumpgateOpeningError(refused)');
      }
    } catch (err) {
      console.log('Removing client %s', target);
      this._activeSystemConnections.delete(target);
      throw err;
    }
    return client;
  }

  private async _ping(client: SystemServerClient): Promise<JumpgateOpeningResponse> {
    return new Promise(function (resolve, reject) {
      client.ping({}, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Pong');
          resolve(undefined);
        }
      });
    });
  }

  private async _openJumpgate(client: SystemServerClient): Promise<JumpgateOpeningResponse> {
    const { ip, port, name } = this;
    return new Promise(function (resolve, reject) {
      client.openJumpgate({ ip, port, name }, (err, response) => {
        if (err || !response.accepted) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}
