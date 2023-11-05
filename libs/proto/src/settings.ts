/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";

export const protobufPackage = "proto";

export interface GetAuthConfigRequest {
  oid: string;
}

export interface OidcConfig {
  clientId: string;
  clientSecret: string;
  issuer: string;
  authorizationURL: string;
  tokenURL: string;
  callbackURL: string;
  userInfoURL: string;
}

export interface UpdateOidcConfig {
  clientId?: string | undefined;
  clientSecret?: string | undefined;
  issuer?: string | undefined;
  authorizationURL?: string | undefined;
  tokenURL?: string | undefined;
  callbackURL?: string | undefined;
  userInfoURL?: string | undefined;
}

export interface CredentialsConfig {
}

export interface UpdateCredentialsConfig {
}

export interface AuthConfig {
  oidc?: OidcConfig | undefined;
  credentials?: CredentialsConfig | undefined;
}

export interface Settings {
  id: string;
  oid: string;
  authConfig: AuthConfig | undefined;
}

export interface GetAuthConfigResponse {
  config?: AuthConfig | undefined;
  error?: Err | undefined;
}

export interface UpdateAuthConfigRequest {
  oid: string;
  oidc?: UpdateOidcConfig | undefined;
  credentials?: UpdateCredentialsConfig | undefined;
}

export interface UpdateAuthConfigResponse {
  success?: boolean | undefined;
  error?: Err | undefined;
}

function createBaseGetAuthConfigRequest(): GetAuthConfigRequest {
  return { oid: "" };
}

export const GetAuthConfigRequest = {
  encode(message: GetAuthConfigRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthConfigRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthConfigRequest();
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

  fromJSON(object: any): GetAuthConfigRequest {
    return { oid: isSet(object.oid) ? globalThis.String(object.oid) : "" };
  },

  toJSON(message: GetAuthConfigRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthConfigRequest>, I>>(base?: I): GetAuthConfigRequest {
    return GetAuthConfigRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthConfigRequest>, I>>(object: I): GetAuthConfigRequest {
    const message = createBaseGetAuthConfigRequest();
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseOidcConfig(): OidcConfig {
  return {
    clientId: "",
    clientSecret: "",
    issuer: "",
    authorizationURL: "",
    tokenURL: "",
    callbackURL: "",
    userInfoURL: "",
  };
}

export const OidcConfig = {
  encode(message: OidcConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.clientSecret !== "") {
      writer.uint32(18).string(message.clientSecret);
    }
    if (message.issuer !== "") {
      writer.uint32(26).string(message.issuer);
    }
    if (message.authorizationURL !== "") {
      writer.uint32(34).string(message.authorizationURL);
    }
    if (message.tokenURL !== "") {
      writer.uint32(42).string(message.tokenURL);
    }
    if (message.callbackURL !== "") {
      writer.uint32(50).string(message.callbackURL);
    }
    if (message.userInfoURL !== "") {
      writer.uint32(58).string(message.userInfoURL);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OidcConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOidcConfig();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OidcConfig {
    return {
      clientId: isSet(object.clientId) ? globalThis.String(object.clientId) : "",
      clientSecret: isSet(object.clientSecret) ? globalThis.String(object.clientSecret) : "",
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : "",
      authorizationURL: isSet(object.authorizationURL) ? globalThis.String(object.authorizationURL) : "",
      tokenURL: isSet(object.tokenURL) ? globalThis.String(object.tokenURL) : "",
      callbackURL: isSet(object.callbackURL) ? globalThis.String(object.callbackURL) : "",
      userInfoURL: isSet(object.userInfoURL) ? globalThis.String(object.userInfoURL) : "",
    };
  },

  toJSON(message: OidcConfig): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.clientSecret !== "") {
      obj.clientSecret = message.clientSecret;
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.authorizationURL !== "") {
      obj.authorizationURL = message.authorizationURL;
    }
    if (message.tokenURL !== "") {
      obj.tokenURL = message.tokenURL;
    }
    if (message.callbackURL !== "") {
      obj.callbackURL = message.callbackURL;
    }
    if (message.userInfoURL !== "") {
      obj.userInfoURL = message.userInfoURL;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OidcConfig>, I>>(base?: I): OidcConfig {
    return OidcConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OidcConfig>, I>>(object: I): OidcConfig {
    const message = createBaseOidcConfig();
    message.clientId = object.clientId ?? "";
    message.clientSecret = object.clientSecret ?? "";
    message.issuer = object.issuer ?? "";
    message.authorizationURL = object.authorizationURL ?? "";
    message.tokenURL = object.tokenURL ?? "";
    message.callbackURL = object.callbackURL ?? "";
    message.userInfoURL = object.userInfoURL ?? "";
    return message;
  },
};

function createBaseUpdateOidcConfig(): UpdateOidcConfig {
  return {
    clientId: undefined,
    clientSecret: undefined,
    issuer: undefined,
    authorizationURL: undefined,
    tokenURL: undefined,
    callbackURL: undefined,
    userInfoURL: undefined,
  };
}

export const UpdateOidcConfig = {
  encode(message: UpdateOidcConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOidcConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOidcConfig();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateOidcConfig {
    return {
      clientId: isSet(object.clientId) ? globalThis.String(object.clientId) : undefined,
      clientSecret: isSet(object.clientSecret) ? globalThis.String(object.clientSecret) : undefined,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : undefined,
      authorizationURL: isSet(object.authorizationURL) ? globalThis.String(object.authorizationURL) : undefined,
      tokenURL: isSet(object.tokenURL) ? globalThis.String(object.tokenURL) : undefined,
      callbackURL: isSet(object.callbackURL) ? globalThis.String(object.callbackURL) : undefined,
      userInfoURL: isSet(object.userInfoURL) ? globalThis.String(object.userInfoURL) : undefined,
    };
  },

  toJSON(message: UpdateOidcConfig): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOidcConfig>, I>>(base?: I): UpdateOidcConfig {
    return UpdateOidcConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOidcConfig>, I>>(object: I): UpdateOidcConfig {
    const message = createBaseUpdateOidcConfig();
    message.clientId = object.clientId ?? undefined;
    message.clientSecret = object.clientSecret ?? undefined;
    message.issuer = object.issuer ?? undefined;
    message.authorizationURL = object.authorizationURL ?? undefined;
    message.tokenURL = object.tokenURL ?? undefined;
    message.callbackURL = object.callbackURL ?? undefined;
    message.userInfoURL = object.userInfoURL ?? undefined;
    return message;
  },
};

function createBaseCredentialsConfig(): CredentialsConfig {
  return {};
}

export const CredentialsConfig = {
  encode(_: CredentialsConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CredentialsConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredentialsConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CredentialsConfig {
    return {};
  },

  toJSON(_: CredentialsConfig): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CredentialsConfig>, I>>(base?: I): CredentialsConfig {
    return CredentialsConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CredentialsConfig>, I>>(_: I): CredentialsConfig {
    const message = createBaseCredentialsConfig();
    return message;
  },
};

function createBaseUpdateCredentialsConfig(): UpdateCredentialsConfig {
  return {};
}

export const UpdateCredentialsConfig = {
  encode(_: UpdateCredentialsConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCredentialsConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCredentialsConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateCredentialsConfig {
    return {};
  },

  toJSON(_: UpdateCredentialsConfig): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCredentialsConfig>, I>>(base?: I): UpdateCredentialsConfig {
    return UpdateCredentialsConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCredentialsConfig>, I>>(_: I): UpdateCredentialsConfig {
    const message = createBaseUpdateCredentialsConfig();
    return message;
  },
};

function createBaseAuthConfig(): AuthConfig {
  return { oidc: undefined, credentials: undefined };
}

export const AuthConfig = {
  encode(message: AuthConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oidc !== undefined) {
      OidcConfig.encode(message.oidc, writer.uint32(10).fork()).ldelim();
    }
    if (message.credentials !== undefined) {
      CredentialsConfig.encode(message.credentials, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oidc = OidcConfig.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.credentials = CredentialsConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthConfig {
    return {
      oidc: isSet(object.oidc) ? OidcConfig.fromJSON(object.oidc) : undefined,
      credentials: isSet(object.credentials) ? CredentialsConfig.fromJSON(object.credentials) : undefined,
    };
  },

  toJSON(message: AuthConfig): unknown {
    const obj: any = {};
    if (message.oidc !== undefined) {
      obj.oidc = OidcConfig.toJSON(message.oidc);
    }
    if (message.credentials !== undefined) {
      obj.credentials = CredentialsConfig.toJSON(message.credentials);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthConfig>, I>>(base?: I): AuthConfig {
    return AuthConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthConfig>, I>>(object: I): AuthConfig {
    const message = createBaseAuthConfig();
    message.oidc = (object.oidc !== undefined && object.oidc !== null)
      ? OidcConfig.fromPartial(object.oidc)
      : undefined;
    message.credentials = (object.credentials !== undefined && object.credentials !== null)
      ? CredentialsConfig.fromPartial(object.credentials)
      : undefined;
    return message;
  },
};

function createBaseSettings(): Settings {
  return { id: "", oid: "", authConfig: undefined };
}

export const Settings = {
  encode(message: Settings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.oid !== "") {
      writer.uint32(18).string(message.oid);
    }
    if (message.authConfig !== undefined) {
      AuthConfig.encode(message.authConfig, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Settings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSettings();
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

          message.authConfig = AuthConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Settings {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      authConfig: isSet(object.authConfig) ? AuthConfig.fromJSON(object.authConfig) : undefined,
    };
  },

  toJSON(message: Settings): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.authConfig !== undefined) {
      obj.authConfig = AuthConfig.toJSON(message.authConfig);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Settings>, I>>(base?: I): Settings {
    return Settings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Settings>, I>>(object: I): Settings {
    const message = createBaseSettings();
    message.id = object.id ?? "";
    message.oid = object.oid ?? "";
    message.authConfig = (object.authConfig !== undefined && object.authConfig !== null)
      ? AuthConfig.fromPartial(object.authConfig)
      : undefined;
    return message;
  },
};

function createBaseGetAuthConfigResponse(): GetAuthConfigResponse {
  return { config: undefined, error: undefined };
}

export const GetAuthConfigResponse = {
  encode(message: GetAuthConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.config !== undefined) {
      AuthConfig.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.config = AuthConfig.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetAuthConfigResponse {
    return {
      config: isSet(object.config) ? AuthConfig.fromJSON(object.config) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetAuthConfigResponse): unknown {
    const obj: any = {};
    if (message.config !== undefined) {
      obj.config = AuthConfig.toJSON(message.config);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthConfigResponse>, I>>(base?: I): GetAuthConfigResponse {
    return GetAuthConfigResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthConfigResponse>, I>>(object: I): GetAuthConfigResponse {
    const message = createBaseGetAuthConfigResponse();
    message.config = (object.config !== undefined && object.config !== null)
      ? AuthConfig.fromPartial(object.config)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseUpdateAuthConfigRequest(): UpdateAuthConfigRequest {
  return { oid: "", oidc: undefined, credentials: undefined };
}

export const UpdateAuthConfigRequest = {
  encode(message: UpdateAuthConfigRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.oidc !== undefined) {
      UpdateOidcConfig.encode(message.oidc, writer.uint32(18).fork()).ldelim();
    }
    if (message.credentials !== undefined) {
      UpdateCredentialsConfig.encode(message.credentials, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAuthConfigRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAuthConfigRequest();
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

          message.oidc = UpdateOidcConfig.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.credentials = UpdateCredentialsConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateAuthConfigRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      oidc: isSet(object.oidc) ? UpdateOidcConfig.fromJSON(object.oidc) : undefined,
      credentials: isSet(object.credentials) ? UpdateCredentialsConfig.fromJSON(object.credentials) : undefined,
    };
  },

  toJSON(message: UpdateAuthConfigRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.oidc !== undefined) {
      obj.oidc = UpdateOidcConfig.toJSON(message.oidc);
    }
    if (message.credentials !== undefined) {
      obj.credentials = UpdateCredentialsConfig.toJSON(message.credentials);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAuthConfigRequest>, I>>(base?: I): UpdateAuthConfigRequest {
    return UpdateAuthConfigRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAuthConfigRequest>, I>>(object: I): UpdateAuthConfigRequest {
    const message = createBaseUpdateAuthConfigRequest();
    message.oid = object.oid ?? "";
    message.oidc = (object.oidc !== undefined && object.oidc !== null)
      ? UpdateOidcConfig.fromPartial(object.oidc)
      : undefined;
    message.credentials = (object.credentials !== undefined && object.credentials !== null)
      ? UpdateCredentialsConfig.fromPartial(object.credentials)
      : undefined;
    return message;
  },
};

function createBaseUpdateAuthConfigResponse(): UpdateAuthConfigResponse {
  return { success: undefined, error: undefined };
}

export const UpdateAuthConfigResponse = {
  encode(message: UpdateAuthConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== undefined) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAuthConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAuthConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
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

  fromJSON(object: any): UpdateAuthConfigResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: UpdateAuthConfigResponse): unknown {
    const obj: any = {};
    if (message.success !== undefined) {
      obj.success = message.success;
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAuthConfigResponse>, I>>(base?: I): UpdateAuthConfigResponse {
    return UpdateAuthConfigResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAuthConfigResponse>, I>>(object: I): UpdateAuthConfigResponse {
    const message = createBaseUpdateAuthConfigResponse();
    message.success = object.success ?? undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface SettingsService {
  GetAuthConfig(request: GetAuthConfigRequest): Promise<GetAuthConfigResponse>;
  UpdateAuthConfig(request: UpdateAuthConfigRequest): Promise<UpdateAuthConfigResponse>;
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
