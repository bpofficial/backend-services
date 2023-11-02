/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "org";

export interface OrgById {
  oid: string;
  uid: number;
}

export interface OrgByDomain {
  uid: number;
  domain: string;
}

export interface CreateOrg {
  name: string;
  domain: string;
  owner: number;
}

export interface Org {
  id: string;
  name: string;
  domain: string;
  owner: number;
}

export interface OrgResponse {
  org?: Org | undefined;
  notFound?: NotFound | undefined;
}

export interface NotFound {
  /** Optionally, provide additional information about why the Org wasn't found */
  reason?: string | undefined;
}

function createBaseOrgById(): OrgById {
  return { oid: "", uid: 0 };
}

export const OrgById = {
  encode(message: OrgById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
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
          if (tag !== 10) {
            break;
          }

          message.oid = reader.string();
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
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
    };
  },

  toJSON(message: OrgById): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
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
    message.oid = object.oid ?? "";
    message.uid = object.uid ?? 0;
    return message;
  },
};

function createBaseOrgByDomain(): OrgByDomain {
  return { uid: 0, domain: "" };
}

export const OrgByDomain = {
  encode(message: OrgByDomain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== 0) {
      writer.uint32(8).int32(message.uid);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgByDomain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgByDomain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.uid = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.domain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrgByDomain {
    return {
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
    };
  },

  toJSON(message: OrgByDomain): unknown {
    const obj: any = {};
    if (message.uid !== 0) {
      obj.uid = Math.round(message.uid);
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgByDomain>, I>>(base?: I): OrgByDomain {
    return OrgByDomain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgByDomain>, I>>(object: I): OrgByDomain {
    const message = createBaseOrgByDomain();
    message.uid = object.uid ?? 0;
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseCreateOrg(): CreateOrg {
  return { name: "", domain: "", owner: 0 };
}

export const CreateOrg = {
  encode(message: CreateOrg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    if (message.owner !== 0) {
      writer.uint32(24).int32(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.owner = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrg {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      owner: isSet(object.owner) ? globalThis.Number(object.owner) : 0,
    };
  },

  toJSON(message: CreateOrg): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.owner !== 0) {
      obj.owner = Math.round(message.owner);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrg>, I>>(base?: I): CreateOrg {
    return CreateOrg.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrg>, I>>(object: I): CreateOrg {
    const message = createBaseCreateOrg();
    message.name = object.name ?? "";
    message.domain = object.domain ?? "";
    message.owner = object.owner ?? 0;
    return message;
  },
};

function createBaseOrg(): Org {
  return { id: "", name: "", domain: "", owner: 0 };
}

export const Org = {
  encode(message: Org, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.domain !== "") {
      writer.uint32(26).string(message.domain);
    }
    if (message.owner !== 0) {
      writer.uint32(32).int32(message.owner);
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.owner = reader.int32();
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
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      owner: isSet(object.owner) ? globalThis.Number(object.owner) : 0,
    };
  },

  toJSON(message: Org): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.owner !== 0) {
      obj.owner = Math.round(message.owner);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Org>, I>>(base?: I): Org {
    return Org.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Org>, I>>(object: I): Org {
    const message = createBaseOrg();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.domain = object.domain ?? "";
    message.owner = object.owner ?? 0;
    return message;
  },
};

function createBaseOrgResponse(): OrgResponse {
  return { org: undefined, notFound: undefined };
}

export const OrgResponse = {
  encode(message: OrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    if (message.notFound !== undefined) {
      NotFound.encode(message.notFound, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.notFound = NotFound.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrgResponse {
    return {
      org: isSet(object.org) ? Org.fromJSON(object.org) : undefined,
      notFound: isSet(object.notFound) ? NotFound.fromJSON(object.notFound) : undefined,
    };
  },

  toJSON(message: OrgResponse): unknown {
    const obj: any = {};
    if (message.org !== undefined) {
      obj.org = Org.toJSON(message.org);
    }
    if (message.notFound !== undefined) {
      obj.notFound = NotFound.toJSON(message.notFound);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgResponse>, I>>(base?: I): OrgResponse {
    return OrgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgResponse>, I>>(object: I): OrgResponse {
    const message = createBaseOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    message.notFound = (object.notFound !== undefined && object.notFound !== null)
      ? NotFound.fromPartial(object.notFound)
      : undefined;
    return message;
  },
};

function createBaseNotFound(): NotFound {
  return { reason: undefined };
}

export const NotFound = {
  encode(message: NotFound, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reason !== undefined) {
      writer.uint32(10).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotFound {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotFound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotFound {
    return { reason: isSet(object.reason) ? globalThis.String(object.reason) : undefined };
  },

  toJSON(message: NotFound): unknown {
    const obj: any = {};
    if (message.reason !== undefined) {
      obj.reason = message.reason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotFound>, I>>(base?: I): NotFound {
    return NotFound.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotFound>, I>>(object: I): NotFound {
    const message = createBaseNotFound();
    message.reason = object.reason ?? undefined;
    return message;
  },
};

export interface OrgService {
  FindOneById(request: OrgById): Promise<OrgResponse>;
  FindOneByDomain(request: OrgByDomain): Promise<OrgResponse>;
  Create(request: CreateOrg): Promise<Org>;
  Delete(request: OrgById): Promise<Empty>;
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
