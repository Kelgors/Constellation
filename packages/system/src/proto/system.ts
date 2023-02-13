/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter server_generic,client_grpc1,eslint_disable,ts_nocheck
// @generated from protobuf file "system.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message Empty
 */
export interface Empty {
}
/**
 * @generated from protobuf message ChatMessage
 */
export interface ChatMessage {
    /**
     * @generated from protobuf field: string author = 1;
     */
    author: string;
    /**
     * @generated from protobuf field: string message = 2;
     */
    message: string;
    /**
     * @generated from protobuf field: uint64 timestamp = 3;
     */
    timestamp: bigint;
}
/**
 * @generated from protobuf message SystemServerInfo
 */
export interface SystemServerInfo {
    /**
     * @generated from protobuf field: string ip = 1;
     */
    ip: string;
    /**
     * @generated from protobuf field: uint32 port = 2;
     */
    port: number;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
}
/**
 * @generated from protobuf message JumpgateInfo
 */
export interface JumpgateInfo {
    /**
     * @generated from protobuf field: JumpgateStatus status = 1;
     */
    status: JumpgateStatus;
    /**
     * @generated from protobuf field: SystemServerInfo info = 2;
     */
    info?: SystemServerInfo;
}
/**
 * @generated from protobuf enum JumpgateStatus
 */
export enum JumpgateStatus {
    /**
     * @generated from protobuf enum value: Opened = 0;
     */
    Opened = 0,
    /**
     * @generated from protobuf enum value: Closed = 1;
     */
    Closed = 1,
    /**
     * @generated from protobuf enum value: Refused = 2;
     */
    Refused = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class Empty$Type extends MessageType<Empty> {
    constructor() {
        super("Empty", []);
    }
    create(value?: PartialMessage<Empty>): Empty {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Empty>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Empty): Empty {
        return target ?? this.create();
    }
    internalBinaryWrite(message: Empty, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Empty
 */
export const Empty = new Empty$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ChatMessage$Type extends MessageType<ChatMessage> {
    constructor() {
        super("ChatMessage", [
            { no: 1, name: "author", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "timestamp", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<ChatMessage>): ChatMessage {
        const message = { author: "", message: "", timestamp: 0n };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ChatMessage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChatMessage): ChatMessage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string author */ 1:
                    message.author = reader.string();
                    break;
                case /* string message */ 2:
                    message.message = reader.string();
                    break;
                case /* uint64 timestamp */ 3:
                    message.timestamp = reader.uint64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ChatMessage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string author = 1; */
        if (message.author !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.author);
        /* string message = 2; */
        if (message.message !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.message);
        /* uint64 timestamp = 3; */
        if (message.timestamp !== 0n)
            writer.tag(3, WireType.Varint).uint64(message.timestamp);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ChatMessage
 */
export const ChatMessage = new ChatMessage$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemServerInfo$Type extends MessageType<SystemServerInfo> {
    constructor() {
        super("SystemServerInfo", [
            { no: 1, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "port", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SystemServerInfo>): SystemServerInfo {
        const message = { ip: "", port: 0, name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SystemServerInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SystemServerInfo): SystemServerInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string ip */ 1:
                    message.ip = reader.string();
                    break;
                case /* uint32 port */ 2:
                    message.port = reader.uint32();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SystemServerInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string ip = 1; */
        if (message.ip !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.ip);
        /* uint32 port = 2; */
        if (message.port !== 0)
            writer.tag(2, WireType.Varint).uint32(message.port);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message SystemServerInfo
 */
export const SystemServerInfo = new SystemServerInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class JumpgateInfo$Type extends MessageType<JumpgateInfo> {
    constructor() {
        super("JumpgateInfo", [
            { no: 1, name: "status", kind: "enum", T: () => ["JumpgateStatus", JumpgateStatus] },
            { no: 2, name: "info", kind: "message", T: () => SystemServerInfo }
        ]);
    }
    create(value?: PartialMessage<JumpgateInfo>): JumpgateInfo {
        const message = { status: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<JumpgateInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: JumpgateInfo): JumpgateInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* JumpgateStatus status */ 1:
                    message.status = reader.int32();
                    break;
                case /* SystemServerInfo info */ 2:
                    message.info = SystemServerInfo.internalBinaryRead(reader, reader.uint32(), options, message.info);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: JumpgateInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* JumpgateStatus status = 1; */
        if (message.status !== 0)
            writer.tag(1, WireType.Varint).int32(message.status);
        /* SystemServerInfo info = 2; */
        if (message.info)
            SystemServerInfo.internalBinaryWrite(message.info, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message JumpgateInfo
 */
export const JumpgateInfo = new JumpgateInfo$Type();
/**
 * @generated ServiceType for protobuf service SystemServer
 */
export const SystemServer = new ServiceType("SystemServer", [
    { name: "Ping", options: {}, I: Empty, O: Empty },
    { name: "SendChatMessage", options: {}, I: ChatMessage, O: Empty },
    { name: "OpenJumpgate", options: {}, I: SystemServerInfo, O: JumpgateInfo }
]);
