/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export interface Err {
  message?: string | undefined;
  info?: string | undefined;
  code?: number | undefined;
}

function createBaseErr(): Err {
  return { message: undefined, info: undefined, code: undefined };
}

export const Err = {
  encode(message: Err, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined) {
      writer.uint32(10).string(message.message);
    }
    if (message.info !== undefined) {
      writer.uint32(18).string(message.info);
    }
    if (message.code !== undefined) {
      writer.uint32(24).int32(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Err {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.info = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.code = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Err {
    return {
      message: isSet(object.message) ? globalThis.String(object.message) : undefined,
      info: isSet(object.info) ? globalThis.String(object.info) : undefined,
      code: isSet(object.code) ? globalThis.Number(object.code) : undefined,
    };
  },

  toJSON(message: Err): unknown {
    const obj: any = {};
    if (message.message !== undefined) {
      obj.message = message.message;
    }
    if (message.info !== undefined) {
      obj.info = message.info;
    }
    if (message.code !== undefined) {
      obj.code = Math.round(message.code);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Err>, I>>(base?: I): Err {
    return Err.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Err>, I>>(object: I): Err {
    const message = createBaseErr();
    message.message = object.message ?? undefined;
    message.info = object.info ?? undefined;
    message.code = object.code ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
