/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";
import { FieldMask } from "./google/protobuf/field_mask";

export const protobufPackage = "proto";

export enum ConnectionType {
  OIDC = 0,
  LOCAL = 1,
  LDAP = 2,
  UNRECOGNIZED = -1,
}

export function connectionTypeFromJSON(object: any): ConnectionType {
  switch (object) {
    case 0:
    case "OIDC":
      return ConnectionType.OIDC;
    case 1:
    case "LOCAL":
      return ConnectionType.LOCAL;
    case 2:
    case "LDAP":
      return ConnectionType.LDAP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConnectionType.UNRECOGNIZED;
  }
}

export function connectionTypeToJSON(object: ConnectionType): string {
  switch (object) {
    case ConnectionType.OIDC:
      return "OIDC";
    case ConnectionType.LOCAL:
      return "LOCAL";
    case ConnectionType.LDAP:
      return "LDAP";
    case ConnectionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateConnectionRequest {
  oid: string;
  name: string;
  key: string;
  type: ConnectionType;
  config: ConnectionConfig | undefined;
}

export interface GetConnectionRequest {
  cid: string;
}

export interface UpdateConnectionRequest {
  cid: string;
  connection: Connection | undefined;
  updateMask: string[] | undefined;
}

export interface DeleteConnectionRequest {
  cid: string;
}

export interface DeleteConnectionResponse {
  success: boolean;
}

export interface Connection {
  id: string;
  oid: string;
  name: string;
  key: string;
  type: ConnectionType;
  config: ConnectionConfig | undefined;
}

export interface OIDCConfig {
  clientId?: string | undefined;
  clientSecret?: string | undefined;
  issuer?: string | undefined;
  authorizationURL?: string | undefined;
  tokenURL?: string | undefined;
  callbackURL?: string | undefined;
  userInfoURL?: string | undefined;
  scopes: string[];
}

export interface LocalConfig {
  policy: string;
}

export interface LDAPConfig {
  ldapServerUrl: string;
  bindDN: string;
  bindPassword: string;
  baseDN: string;
  searchFilter: string;
}

export interface ConnectionConfig {
  oidc?: OIDCConfig | undefined;
  local?: LocalConfig | undefined;
  ldap?: LDAPConfig | undefined;
}

export interface ConnectionResponse {
  connection?: Connection | undefined;
  error?: Err | undefined;
}

function createBaseCreateConnectionRequest(): CreateConnectionRequest {
  return { oid: "", name: "", key: "", type: 0, config: undefined };
}

export const CreateConnectionRequest = {
  encode(message: CreateConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.config !== undefined) {
      ConnectionConfig.encode(message.config, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConnectionRequest();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.config = ConnectionConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateConnectionRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      type: isSet(object.type) ? connectionTypeFromJSON(object.type) : 0,
      config: isSet(object.config) ? ConnectionConfig.fromJSON(object.config) : undefined,
    };
  },

  toJSON(message: CreateConnectionRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.type !== 0) {
      obj.type = connectionTypeToJSON(message.type);
    }
    if (message.config !== undefined) {
      obj.config = ConnectionConfig.toJSON(message.config);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateConnectionRequest>, I>>(base?: I): CreateConnectionRequest {
    return CreateConnectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateConnectionRequest>, I>>(object: I): CreateConnectionRequest {
    const message = createBaseCreateConnectionRequest();
    message.oid = object.oid ?? "";
    message.name = object.name ?? "";
    message.key = object.key ?? "";
    message.type = object.type ?? 0;
    message.config = (object.config !== undefined && object.config !== null)
      ? ConnectionConfig.fromPartial(object.config)
      : undefined;
    return message;
  },
};

function createBaseGetConnectionRequest(): GetConnectionRequest {
  return { cid: "" };
}

export const GetConnectionRequest = {
  encode(message: GetConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetConnectionRequest {
    return { cid: isSet(object.cid) ? globalThis.String(object.cid) : "" };
  },

  toJSON(message: GetConnectionRequest): unknown {
    const obj: any = {};
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetConnectionRequest>, I>>(base?: I): GetConnectionRequest {
    return GetConnectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetConnectionRequest>, I>>(object: I): GetConnectionRequest {
    const message = createBaseGetConnectionRequest();
    message.cid = object.cid ?? "";
    return message;
  },
};

function createBaseUpdateConnectionRequest(): UpdateConnectionRequest {
  return { cid: "", connection: undefined, updateMask: undefined };
}

export const UpdateConnectionRequest = {
  encode(message: UpdateConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.connection !== undefined) {
      Connection.encode(message.connection, writer.uint32(18).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.updateMask), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connection = Connection.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.updateMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateConnectionRequest {
    return {
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
      connection: isSet(object.connection) ? Connection.fromJSON(object.connection) : undefined,
      updateMask: isSet(object.updateMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.updateMask)) : undefined,
    };
  },

  toJSON(message: UpdateConnectionRequest): unknown {
    const obj: any = {};
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    if (message.connection !== undefined) {
      obj.connection = Connection.toJSON(message.connection);
    }
    if (message.updateMask !== undefined) {
      obj.updateMask = FieldMask.toJSON(FieldMask.wrap(message.updateMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateConnectionRequest>, I>>(base?: I): UpdateConnectionRequest {
    return UpdateConnectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateConnectionRequest>, I>>(object: I): UpdateConnectionRequest {
    const message = createBaseUpdateConnectionRequest();
    message.cid = object.cid ?? "";
    message.connection = (object.connection !== undefined && object.connection !== null)
      ? Connection.fromPartial(object.connection)
      : undefined;
    message.updateMask = object.updateMask ?? undefined;
    return message;
  },
};

function createBaseDeleteConnectionRequest(): DeleteConnectionRequest {
  return { cid: "" };
}

export const DeleteConnectionRequest = {
  encode(message: DeleteConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteConnectionRequest {
    return { cid: isSet(object.cid) ? globalThis.String(object.cid) : "" };
  },

  toJSON(message: DeleteConnectionRequest): unknown {
    const obj: any = {};
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteConnectionRequest>, I>>(base?: I): DeleteConnectionRequest {
    return DeleteConnectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteConnectionRequest>, I>>(object: I): DeleteConnectionRequest {
    const message = createBaseDeleteConnectionRequest();
    message.cid = object.cid ?? "";
    return message;
  },
};

function createBaseDeleteConnectionResponse(): DeleteConnectionResponse {
  return { success: false };
}

export const DeleteConnectionResponse = {
  encode(message: DeleteConnectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteConnectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteConnectionResponse();
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

  fromJSON(object: any): DeleteConnectionResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteConnectionResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteConnectionResponse>, I>>(base?: I): DeleteConnectionResponse {
    return DeleteConnectionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteConnectionResponse>, I>>(object: I): DeleteConnectionResponse {
    const message = createBaseDeleteConnectionResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseConnection(): Connection {
  return { id: "", oid: "", name: "", key: "", type: 0, config: undefined };
}

export const Connection = {
  encode(message: Connection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.oid !== "") {
      writer.uint32(18).string(message.oid);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.key !== "") {
      writer.uint32(34).string(message.key);
    }
    if (message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.config !== undefined) {
      ConnectionConfig.encode(message.config, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Connection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnection();
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

          message.oid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.key = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.config = ConnectionConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Connection {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      type: isSet(object.type) ? connectionTypeFromJSON(object.type) : 0,
      config: isSet(object.config) ? ConnectionConfig.fromJSON(object.config) : undefined,
    };
  },

  toJSON(message: Connection): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.type !== 0) {
      obj.type = connectionTypeToJSON(message.type);
    }
    if (message.config !== undefined) {
      obj.config = ConnectionConfig.toJSON(message.config);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Connection>, I>>(base?: I): Connection {
    return Connection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Connection>, I>>(object: I): Connection {
    const message = createBaseConnection();
    message.id = object.id ?? "";
    message.oid = object.oid ?? "";
    message.name = object.name ?? "";
    message.key = object.key ?? "";
    message.type = object.type ?? 0;
    message.config = (object.config !== undefined && object.config !== null)
      ? ConnectionConfig.fromPartial(object.config)
      : undefined;
    return message;
  },
};

function createBaseOIDCConfig(): OIDCConfig {
  return {
    clientId: undefined,
    clientSecret: undefined,
    issuer: undefined,
    authorizationURL: undefined,
    tokenURL: undefined,
    callbackURL: undefined,
    userInfoURL: undefined,
    scopes: [],
  };
}

export const OIDCConfig = {
  encode(message: OIDCConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== undefined) {
      writer.uint32(10).string(message.clientId);
    }
    if (message.clientSecret !== undefined) {
      writer.uint32(18).string(message.clientSecret);
    }
    if (message.issuer !== undefined) {
      writer.uint32(26).string(message.issuer);
    }
    if (message.authorizationURL !== undefined) {
      writer.uint32(34).string(message.authorizationURL);
    }
    if (message.tokenURL !== undefined) {
      writer.uint32(42).string(message.tokenURL);
    }
    if (message.callbackURL !== undefined) {
      writer.uint32(50).string(message.callbackURL);
    }
    if (message.userInfoURL !== undefined) {
      writer.uint32(58).string(message.userInfoURL);
    }
    for (const v of message.scopes) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OIDCConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOIDCConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientSecret = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authorizationURL = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tokenURL = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.callbackURL = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.userInfoURL = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.scopes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OIDCConfig {
    return {
      clientId: isSet(object.clientId) ? globalThis.String(object.clientId) : undefined,
      clientSecret: isSet(object.clientSecret) ? globalThis.String(object.clientSecret) : undefined,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : undefined,
      authorizationURL: isSet(object.authorizationURL) ? globalThis.String(object.authorizationURL) : undefined,
      tokenURL: isSet(object.tokenURL) ? globalThis.String(object.tokenURL) : undefined,
      callbackURL: isSet(object.callbackURL) ? globalThis.String(object.callbackURL) : undefined,
      userInfoURL: isSet(object.userInfoURL) ? globalThis.String(object.userInfoURL) : undefined,
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: OIDCConfig): unknown {
    const obj: any = {};
    if (message.clientId !== undefined) {
      obj.clientId = message.clientId;
    }
    if (message.clientSecret !== undefined) {
      obj.clientSecret = message.clientSecret;
    }
    if (message.issuer !== undefined) {
      obj.issuer = message.issuer;
    }
    if (message.authorizationURL !== undefined) {
      obj.authorizationURL = message.authorizationURL;
    }
    if (message.tokenURL !== undefined) {
      obj.tokenURL = message.tokenURL;
    }
    if (message.callbackURL !== undefined) {
      obj.callbackURL = message.callbackURL;
    }
    if (message.userInfoURL !== undefined) {
      obj.userInfoURL = message.userInfoURL;
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OIDCConfig>, I>>(base?: I): OIDCConfig {
    return OIDCConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OIDCConfig>, I>>(object: I): OIDCConfig {
    const message = createBaseOIDCConfig();
    message.clientId = object.clientId ?? undefined;
    message.clientSecret = object.clientSecret ?? undefined;
    message.issuer = object.issuer ?? undefined;
    message.authorizationURL = object.authorizationURL ?? undefined;
    message.tokenURL = object.tokenURL ?? undefined;
    message.callbackURL = object.callbackURL ?? undefined;
    message.userInfoURL = object.userInfoURL ?? undefined;
    message.scopes = object.scopes?.map((e) => e) || [];
    return message;
  },
};

function createBaseLocalConfig(): LocalConfig {
  return { policy: "" };
}

export const LocalConfig = {
  encode(message: LocalConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policy !== "") {
      writer.uint32(10).string(message.policy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocalConfig {
    return { policy: isSet(object.policy) ? globalThis.String(object.policy) : "" };
  },

  toJSON(message: LocalConfig): unknown {
    const obj: any = {};
    if (message.policy !== "") {
      obj.policy = message.policy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocalConfig>, I>>(base?: I): LocalConfig {
    return LocalConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LocalConfig>, I>>(object: I): LocalConfig {
    const message = createBaseLocalConfig();
    message.policy = object.policy ?? "";
    return message;
  },
};

function createBaseLDAPConfig(): LDAPConfig {
  return { ldapServerUrl: "", bindDN: "", bindPassword: "", baseDN: "", searchFilter: "" };
}

export const LDAPConfig = {
  encode(message: LDAPConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ldapServerUrl !== "") {
      writer.uint32(10).string(message.ldapServerUrl);
    }
    if (message.bindDN !== "") {
      writer.uint32(18).string(message.bindDN);
    }
    if (message.bindPassword !== "") {
      writer.uint32(26).string(message.bindPassword);
    }
    if (message.baseDN !== "") {
      writer.uint32(34).string(message.baseDN);
    }
    if (message.searchFilter !== "") {
      writer.uint32(42).string(message.searchFilter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LDAPConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLDAPConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ldapServerUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bindDN = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bindPassword = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.baseDN = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.searchFilter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LDAPConfig {
    return {
      ldapServerUrl: isSet(object.ldapServerUrl) ? globalThis.String(object.ldapServerUrl) : "",
      bindDN: isSet(object.bindDN) ? globalThis.String(object.bindDN) : "",
      bindPassword: isSet(object.bindPassword) ? globalThis.String(object.bindPassword) : "",
      baseDN: isSet(object.baseDN) ? globalThis.String(object.baseDN) : "",
      searchFilter: isSet(object.searchFilter) ? globalThis.String(object.searchFilter) : "",
    };
  },

  toJSON(message: LDAPConfig): unknown {
    const obj: any = {};
    if (message.ldapServerUrl !== "") {
      obj.ldapServerUrl = message.ldapServerUrl;
    }
    if (message.bindDN !== "") {
      obj.bindDN = message.bindDN;
    }
    if (message.bindPassword !== "") {
      obj.bindPassword = message.bindPassword;
    }
    if (message.baseDN !== "") {
      obj.baseDN = message.baseDN;
    }
    if (message.searchFilter !== "") {
      obj.searchFilter = message.searchFilter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LDAPConfig>, I>>(base?: I): LDAPConfig {
    return LDAPConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LDAPConfig>, I>>(object: I): LDAPConfig {
    const message = createBaseLDAPConfig();
    message.ldapServerUrl = object.ldapServerUrl ?? "";
    message.bindDN = object.bindDN ?? "";
    message.bindPassword = object.bindPassword ?? "";
    message.baseDN = object.baseDN ?? "";
    message.searchFilter = object.searchFilter ?? "";
    return message;
  },
};

function createBaseConnectionConfig(): ConnectionConfig {
  return { oidc: undefined, local: undefined, ldap: undefined };
}

export const ConnectionConfig = {
  encode(message: ConnectionConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oidc !== undefined) {
      OIDCConfig.encode(message.oidc, writer.uint32(10).fork()).ldelim();
    }
    if (message.local !== undefined) {
      LocalConfig.encode(message.local, writer.uint32(18).fork()).ldelim();
    }
    if (message.ldap !== undefined) {
      LDAPConfig.encode(message.ldap, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oidc = OIDCConfig.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.local = LocalConfig.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ldap = LDAPConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionConfig {
    return {
      oidc: isSet(object.oidc) ? OIDCConfig.fromJSON(object.oidc) : undefined,
      local: isSet(object.local) ? LocalConfig.fromJSON(object.local) : undefined,
      ldap: isSet(object.ldap) ? LDAPConfig.fromJSON(object.ldap) : undefined,
    };
  },

  toJSON(message: ConnectionConfig): unknown {
    const obj: any = {};
    if (message.oidc !== undefined) {
      obj.oidc = OIDCConfig.toJSON(message.oidc);
    }
    if (message.local !== undefined) {
      obj.local = LocalConfig.toJSON(message.local);
    }
    if (message.ldap !== undefined) {
      obj.ldap = LDAPConfig.toJSON(message.ldap);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionConfig>, I>>(base?: I): ConnectionConfig {
    return ConnectionConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionConfig>, I>>(object: I): ConnectionConfig {
    const message = createBaseConnectionConfig();
    message.oidc = (object.oidc !== undefined && object.oidc !== null)
      ? OIDCConfig.fromPartial(object.oidc)
      : undefined;
    message.local = (object.local !== undefined && object.local !== null)
      ? LocalConfig.fromPartial(object.local)
      : undefined;
    message.ldap = (object.ldap !== undefined && object.ldap !== null)
      ? LDAPConfig.fromPartial(object.ldap)
      : undefined;
    return message;
  },
};

function createBaseConnectionResponse(): ConnectionResponse {
  return { connection: undefined, error: undefined };
}

export const ConnectionResponse = {
  encode(message: ConnectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection !== undefined) {
      Connection.encode(message.connection, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection = Connection.decode(reader, reader.uint32());
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

  fromJSON(object: any): ConnectionResponse {
    return {
      connection: isSet(object.connection) ? Connection.fromJSON(object.connection) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ConnectionResponse): unknown {
    const obj: any = {};
    if (message.connection !== undefined) {
      obj.connection = Connection.toJSON(message.connection);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionResponse>, I>>(base?: I): ConnectionResponse {
    return ConnectionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionResponse>, I>>(object: I): ConnectionResponse {
    const message = createBaseConnectionResponse();
    message.connection = (object.connection !== undefined && object.connection !== null)
      ? Connection.fromPartial(object.connection)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface ConnectionService {
  GetConnection(request: GetConnectionRequest): Promise<ConnectionResponse>;
  Create(request: CreateConnectionRequest): Promise<Connection>;
  Update(request: UpdateConnectionRequest): Promise<ConnectionResponse>;
  Delete(request: DeleteConnectionRequest): Promise<DeleteConnectionResponse>;
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
