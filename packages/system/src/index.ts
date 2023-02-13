import * as grpc from '@grpc/grpc-js';
import { adaptService } from '@protobuf-ts/grpc-backend';
import { SystemConfiguration } from './Configuration';
import JumpgateManager from './JumpgateManager';
import { SystemServer } from './proto/system';
import SystemServerService from './SystemServerService';
import createFactory from './SystemServerService/context';

const configuration: SystemConfiguration = require(process.env.CONFIG || './config.json');
const jumpgates = new JumpgateManager(configuration);

process.on('SIGINT', () => {
  console.info('Interrupted');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.info('Interrupted');
  process.exit(0);
});

(function () {
  const server = new grpc.Server();
  server.addService(
    ...adaptService(SystemServer, new SystemServerService(), {
      contextFactory: createFactory({
        configuration,
        jumpgates
      })
    })
  );
  server.bindAsync(
    `${configuration.ip}:${configuration.port}`,
    grpc.ServerCredentials.createInsecure(),
    async (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server started on ${configuration.ip}:${configuration.port}`);
        server.start();
      }
      await jumpgates.start();
    }
  );
})();
