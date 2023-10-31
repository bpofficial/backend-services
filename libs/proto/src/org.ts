/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "org";

export interface OrgById {
  oid: number;
  uid: number;
}

export interface Org {
  id: number;
  name: string;
}

function createBaseOrgById(): OrgById {
  return { oid: 0, uid: 0 };
}

export const OrgById = {
  encode(message: OrgById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== 0) {
      writer.uint32(8).int32(message.oid);
    }
    if (message.uid !== 0) {
      writer.uint32(16).int32(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgById {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgById();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.oid = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.uid = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrgById {
    return {
      oid: isSet(object.oid) ? globalThis.Number(object.oid) : 0,
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
    };
  },

  toJSON(message: OrgById): unknown {
    const obj: any = {};
    if (message.oid !== 0) {
      obj.oid = Math.round(message.oid);
    }
    if (message.uid !== 0) {
      obj.uid = Math.round(message.uid);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgById>, I>>(base?: I): OrgById {
    return OrgById.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgById>, I>>(object: I): OrgById {
    const message = createBaseOrgById();
    message.oid = object.oid ?? 0;
    message.uid = object.uid ?? 0;
    return message;
  },
};

function createBaseOrg(): Org {
  return { id: 0, name: "" };
}

export const Org = {
  encode(message: Org, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Org {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Org {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Org): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Org>, I>>(base?: I): Org {
    return Org.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Org>, I>>(object: I): Org {
    const message = createBaseOrg();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    return message;
  },
};

export interface OrgService {
  FindOne(request: OrgById): Promise<Org>;
}

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
