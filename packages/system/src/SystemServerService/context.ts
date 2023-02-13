import * as grpc from '@grpc/grpc-js';
import { createContext } from '@protobuf-ts/grpc-backend';
import { MethodInfo, ServerCallContext, ServiceInfo } from '@protobuf-ts/runtime-rpc';
import { SystemConfiguration } from '../Configuration';
import JumpgateManager from '../JumpgateManager';

type SystemServerContext = {
  configuration: SystemConfiguration;
  jumpgates: JumpgateManager;
};

export type SystemServerCallContext = ServerCallContext & SystemServerContext;

export default function createFactory({ configuration, jumpgates }: SystemServerContext) {
  return function appContextFactory(
    serviceInfo: ServiceInfo,
    methodInfo: MethodInfo,
    call: grpc.ServerUnaryCall<any, any> | grpc.ServerReadableStream<any, any> | grpc.ServerWritableStream<any, any>
  ): SystemServerCallContext {
    const context = createContext(serviceInfo, methodInfo, call) as SystemServerCallContext;
    context.configuration = configuration;
    context.jumpgates = jumpgates;
    return context;
  };
}
