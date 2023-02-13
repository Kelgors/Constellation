import { JumpgateInfo, JumpgateStatus, SystemServerInfo } from '../proto/system';
import { SystemServerCallContext } from './context';

export default async function openJumpgate(
  request: SystemServerInfo,
  context: SystemServerCallContext
): Promise<JumpgateInfo> {
  const { configuration, jumpgates } = context;
  console.log('Received System::openJumpgate(from: %s)', `${request.ip}:${request.port}`);
  if (!configuration.jumpgates.some(({ ip, port }) => request.ip === ip && request.port === port)) {
    console.log('- Rejected');
    return { status: JumpgateStatus.Refused };
  }

  try {
    await jumpgates.connect(`${request.ip}:${request.port}`);
  } catch (err) {
    return { status: JumpgateStatus.Closed };
  }

  console.log('- Accepting connection');
  return {
    status: JumpgateStatus.Opened,
    info: {
      ip: configuration.ip,
      port: configuration.port,
      name: configuration.name
    }
  };
}
