/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";

export const protobufPackage = "proto";

export interface OrgById {
  oid: string;
}

export interface OrgByDomain {
  domain: string;
}

export interface CreateOrgRequest {
  name: string;
  domain: string;
  owner: string;
  callbackUrl: string;
}

export interface CreateOrgResponse {
  org?: Org | undefined;
  error?: Err | undefined;
}

export interface DeleteOrgRequest {
  oid: string;
  uid: string;
}

export interface DeleteOrgResponse {
  success: boolean;
}

export interface Org {
  id: string;
  name: string;
  domain: string;
  owner: string;
  callbackUrl: string;
}

export interface OrgResponse {
  org?: Org | undefined;
  error?: Err | undefined;
}

function createBaseOrgById(): OrgById {
  return { oid: "" };
}

export const OrgById = {
  encode(message: OrgById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrgById {
    return { oid: isSet(object.oid) ? globalThis.String(object.oid) : "" };
  },

  toJSON(message: OrgById): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgById>, I>>(base?: I): OrgById {
    return OrgById.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgById>, I>>(object: I): OrgById {
    const message = createBaseOrgById();
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseOrgByDomain(): OrgByDomain {
  return { domain: "" };
}

export const OrgByDomain = {
  encode(message: OrgByDomain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
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
          if (tag !== 10) {
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
    return { domain: isSet(object.domain) ? globalThis.String(object.domain) : "" };
  },

  toJSON(message: OrgByDomain): unknown {
    const obj: any = {};
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
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseCreateOrgRequest(): CreateOrgRequest {
  return { name: "", domain: "", owner: "", callbackUrl: "" };
}

export const CreateOrgRequest = {
  encode(message: CreateOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.callbackUrl !== "") {
      writer.uint32(34).string(message.callbackUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrgRequest();
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
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.callbackUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrgRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      callbackUrl: isSet(object.callbackUrl) ? globalThis.String(object.callbackUrl) : "",
    };
  },

  toJSON(message: CreateOrgRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.callbackUrl !== "") {
      obj.callbackUrl = message.callbackUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrgRequest>, I>>(base?: I): CreateOrgRequest {
    return CreateOrgRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrgRequest>, I>>(object: I): CreateOrgRequest {
    const message = createBaseCreateOrgRequest();
    message.name = object.name ?? "";
    message.domain = object.domain ?? "";
    message.owner = object.owner ?? "";
    message.callbackUrl = object.callbackUrl ?? "";
    return message;
  },
};

function createBaseCreateOrgResponse(): CreateOrgResponse {
  return { org: undefined, error: undefined };
}

export const CreateOrgResponse = {
  encode(message: CreateOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrgResponse();
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

          message.error = Err.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrgResponse {
    return {
      org: isSet(object.org) ? Org.fromJSON(object.org) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: CreateOrgResponse): unknown {
    const obj: any = {};
    if (message.org !== undefined) {
      obj.org = Org.toJSON(message.org);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrgResponse>, I>>(base?: I): CreateOrgResponse {
    return CreateOrgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrgResponse>, I>>(object: I): CreateOrgResponse {
    const message = createBaseCreateOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseDeleteOrgRequest(): DeleteOrgRequest {
  return { oid: "", uid: "" };
}

export const DeleteOrgRequest = {
  encode(message: DeleteOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrgRequest();
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
          if (tag !== 18) {
            break;
          }

          message.uid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOrgRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
    };
  },

  toJSON(message: DeleteOrgRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteOrgRequest>, I>>(base?: I): DeleteOrgRequest {
    return DeleteOrgRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteOrgRequest>, I>>(object: I): DeleteOrgRequest {
    const message = createBaseDeleteOrgRequest();
    message.oid = object.oid ?? "";
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseDeleteOrgResponse(): DeleteOrgResponse {
  return { success: false };
}

export const DeleteOrgResponse = {
  encode(message: DeleteOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOrgResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteOrgResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteOrgResponse>, I>>(base?: I): DeleteOrgResponse {
    return DeleteOrgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteOrgResponse>, I>>(object: I): DeleteOrgResponse {
    const message = createBaseDeleteOrgResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseOrg(): Org {
  return { id: "", name: "", domain: "", owner: "", callbackUrl: "" };
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
    if (message.owner !== "") {
      writer.uint32(34).string(message.owner);
    }
    if (message.callbackUrl !== "") {
      writer.uint32(42).string(message.callbackUrl);
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
          if (tag !== 34) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.callbackUrl = reader.string();
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
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      callbackUrl: isSet(object.callbackUrl) ? globalThis.String(object.callbackUrl) : "",
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
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.callbackUrl !== "") {
      obj.callbackUrl = message.callbackUrl;
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
    message.owner = object.owner ?? "";
    message.callbackUrl = object.callbackUrl ?? "";
    return message;
  },
};

function createBaseOrgResponse(): OrgResponse {
  return { org: undefined, error: undefined };
}

export const OrgResponse = {
  encode(message: OrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
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

          message.error = Err.decode(reader, reader.uint32());
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
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: OrgResponse): unknown {
    const obj: any = {};
    if (message.org !== undefined) {
      obj.org = Org.toJSON(message.org);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgResponse>, I>>(base?: I): OrgResponse {
    return OrgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgResponse>, I>>(object: I): OrgResponse {
    const message = createBaseOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface OrgService {
  FindOneById(request: OrgById): Promise<OrgResponse>;
  FindOneByDomain(request: OrgByDomain): Promise<OrgResponse>;
  Create(request: CreateOrgRequest): Promise<CreateOrgResponse>;
  Delete(request: OrgById): Promise<DeleteOrgResponse>;
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
