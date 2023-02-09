import * as grpc from '@grpc/grpc-js';
import { adaptService } from '@protobuf-ts/grpc-backend';
import { ServerCallContext } from '@protobuf-ts/runtime-rpc';
import JumpgateManager from './JumpgateManager';
import { ChatMessage, Empty, JumpgateOpening, JumpgateOpeningResponse, SystemServer } from './proto/system';
import { ISystemServer } from './proto/system.server';

const { TARGET, NAME } = process.env;
const IP = process.env.IP || '127.0.0.1';
const PORT = parseInt(process.env.PORT || '46710', 10);

const jumpgates = new JumpgateManager(IP, PORT, NAME);

const service: ISystemServer = {
  async sendChatMessage(request: ChatMessage, context: ServerCallContext): Promise<JumpgateOpeningResponse> {
    throw new Error('Function not implemented.');
  },
  async openJumpgate(request: JumpgateOpening, context: ServerCallContext): Promise<JumpgateOpeningResponse> {
    const target = `${request.ip}:${request.port}`;
    console.log('Received System::openJumpgate(from: %s)', target);
    if (`${request.ip}:${request.port}` !== TARGET) {
      console.log('- Rejected');
      return { accepted: false };
    }

    try {
      await jumpgates.connect(`${request.ip}:${request.port}`);
    } catch (err) {
      return { accepted: false };
    }

    console.log('- Accepting connection');
    return {
      accepted: true,
      info: {
        ip: IP,
        port: PORT,
        name: NAME
      }
    };
  },
  async ping(request: Empty, context: ServerCallContext): Promise<Empty> {
    console.log('Ping');
    return {};
  }
};
(function () {
  const server = new grpc.Server();
  server.addService(...adaptService(SystemServer, service));
  server.bindAsync(
    `${IP}:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    async (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server started port: ${port}`);
        server.start();
      }
      if (TARGET) {
        try {
          console.log('Connecting on start to : %s', TARGET);
          await jumpgates.connect(TARGET);
        } catch (err) {}
      }
    }
  );
})();
