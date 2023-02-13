import { ChatMessage, Empty, JumpgateInfo, SystemServerInfo } from 'proto/system';
import { ISystemServer } from 'proto/system.server';
import { SystemServerCallContext } from './context';
import _openJumpgate from './openJumpgate';

export default class SystemServerService implements ISystemServer<SystemServerCallContext> {
  async ping(request: Empty, context: SystemServerCallContext): Promise<Empty> {
    console.log('Received::Ping');
    return {};
  }
  async sendChatMessage(request: ChatMessage, context: SystemServerCallContext): Promise<Empty> {
    throw new Error('Method not implemented.');
  }
  async openJumpgate(request: SystemServerInfo, context: SystemServerCallContext): Promise<JumpgateInfo> {
    return _openJumpgate(request, context);
  }
}
