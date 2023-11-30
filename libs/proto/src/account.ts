/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";
import { FieldMask } from "./google/protobuf/field_mask";
import Long = require("long");

export const protobufPackage = "proto";

export interface ConnectAccountRequest {
  uid: string;
  cid: string;
  account: Account | undefined;
  createMask: string[] | undefined;
}

export interface GetAccountRequest {
  aid: string;
  uid: string;
}

export interface GetAccountByUsernameRequest {
  username: string;
  cid: string;
}

export interface UpdateAccountRequest {
  aid: string;
  uid: string;
  account: Account | undefined;
  updateMask: string[] | undefined;
}

export interface DisconnectAccountRequest {
  aid: string;
  uid: string;
}

export interface DisconnectAccountResponse {
  success: boolean;
}

export interface VerifyEmailRequest {
  aid: string;
  uid: string;
  token: string;
}

export interface VerifyAccountResponse {
  success?: boolean | undefined;
  error?: Err | undefined;
}

export interface ValidatePasswordRequest {
  username: string;
  password: string;
  cid: string;
}

export interface RequestVerificationRequest {
  aid: string;
}

export interface RequestVerificationResponse {
  verification?: string | undefined;
  error?: Err | undefined;
}

export interface Account {
  id: string;
  uid: string;
  cid: string;
  /** Local password connection */
  password?: string | undefined;
  verified?: boolean | undefined;
  verificationToken?: string | undefined;
  verificationExpires?:
    | number
    | undefined;
  /** OIDC Connection */
  sub?: string | undefined;
  issuer?: string | undefined;
  name?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  idToken?: string | undefined;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}

export interface AccountResponse {
  account?: Account | undefined;
  error?: Err | undefined;
}

function createBaseConnectAccountRequest(): ConnectAccountRequest {
  return { uid: "", cid: "", account: undefined, createMask: undefined };
}

export const ConnectAccountRequest = {
  encode(message: ConnectAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.cid !== "") {
      writer.uint32(18).string(message.cid);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(26).fork()).ldelim();
    }
    if (message.createMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.createMask), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.account = Account.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectAccountRequest {
    return {
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
      account: isSet(object.account) ? Account.fromJSON(object.account) : undefined,
      createMask: isSet(object.createMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.createMask)) : undefined,
    };
  },

  toJSON(message: ConnectAccountRequest): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    if (message.account !== undefined) {
      obj.account = Account.toJSON(message.account);
    }
    if (message.createMask !== undefined) {
      obj.createMask = FieldMask.toJSON(FieldMask.wrap(message.createMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectAccountRequest>, I>>(base?: I): ConnectAccountRequest {
    return ConnectAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectAccountRequest>, I>>(object: I): ConnectAccountRequest {
    const message = createBaseConnectAccountRequest();
    message.uid = object.uid ?? "";
    message.cid = object.cid ?? "";
    message.account = (object.account !== undefined && object.account !== null)
      ? Account.fromPartial(object.account)
      : undefined;
    message.createMask = object.createMask ?? undefined;
    return message;
  },
};

function createBaseGetAccountRequest(): GetAccountRequest {
  return { aid: "", uid: "" };
}

export const GetAccountRequest = {
  encode(message: GetAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aid !== "") {
      writer.uint32(10).string(message.aid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.aid = reader.string();
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

  fromJSON(object: any): GetAccountRequest {
    return {
      aid: isSet(object.aid) ? globalThis.String(object.aid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
    };
  },

  toJSON(message: GetAccountRequest): unknown {
    const obj: any = {};
    if (message.aid !== "") {
      obj.aid = message.aid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAccountRequest>, I>>(base?: I): GetAccountRequest {
    return GetAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAccountRequest>, I>>(object: I): GetAccountRequest {
    const message = createBaseGetAccountRequest();
    message.aid = object.aid ?? "";
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseGetAccountByUsernameRequest(): GetAccountByUsernameRequest {
  return { username: "", cid: "" };
}

export const GetAccountByUsernameRequest = {
  encode(message: GetAccountByUsernameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.cid !== "") {
      writer.uint32(18).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountByUsernameRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAccountByUsernameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetAccountByUsernameRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
    };
  },

  toJSON(message: GetAccountByUsernameRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAccountByUsernameRequest>, I>>(base?: I): GetAccountByUsernameRequest {
    return GetAccountByUsernameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAccountByUsernameRequest>, I>>(object: I): GetAccountByUsernameRequest {
    const message = createBaseGetAccountByUsernameRequest();
    message.username = object.username ?? "";
    message.cid = object.cid ?? "";
    return message;
  },
};

function createBaseUpdateAccountRequest(): UpdateAccountRequest {
  return { aid: "", uid: "", account: undefined, updateMask: undefined };
}

export const UpdateAccountRequest = {
  encode(message: UpdateAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aid !== "") {
      writer.uint32(10).string(message.aid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(26).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.updateMask), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.aid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.account = Account.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): UpdateAccountRequest {
    return {
      aid: isSet(object.aid) ? globalThis.String(object.aid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      account: isSet(object.account) ? Account.fromJSON(object.account) : undefined,
      updateMask: isSet(object.updateMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.updateMask)) : undefined,
    };
  },

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    if (message.aid !== "") {
      obj.aid = message.aid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.account !== undefined) {
      obj.account = Account.toJSON(message.account);
    }
    if (message.updateMask !== undefined) {
      obj.updateMask = FieldMask.toJSON(FieldMask.wrap(message.updateMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(base?: I): UpdateAccountRequest {
    return UpdateAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(object: I): UpdateAccountRequest {
    const message = createBaseUpdateAccountRequest();
    message.aid = object.aid ?? "";
    message.uid = object.uid ?? "";
    message.account = (object.account !== undefined && object.account !== null)
      ? Account.fromPartial(object.account)
      : undefined;
    message.updateMask = object.updateMask ?? undefined;
    return message;
  },
};

function createBaseDisconnectAccountRequest(): DisconnectAccountRequest {
  return { aid: "", uid: "" };
}

export const DisconnectAccountRequest = {
  encode(message: DisconnectAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aid !== "") {
      writer.uint32(10).string(message.aid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisconnectAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnectAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.aid = reader.string();
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

  fromJSON(object: any): DisconnectAccountRequest {
    return {
      aid: isSet(object.aid) ? globalThis.String(object.aid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
    };
  },

  toJSON(message: DisconnectAccountRequest): unknown {
    const obj: any = {};
    if (message.aid !== "") {
      obj.aid = message.aid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DisconnectAccountRequest>, I>>(base?: I): DisconnectAccountRequest {
    return DisconnectAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisconnectAccountRequest>, I>>(object: I): DisconnectAccountRequest {
    const message = createBaseDisconnectAccountRequest();
    message.aid = object.aid ?? "";
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseDisconnectAccountResponse(): DisconnectAccountResponse {
  return { success: false };
}

export const DisconnectAccountResponse = {
  encode(message: DisconnectAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisconnectAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnectAccountResponse();
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

  fromJSON(object: any): DisconnectAccountResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DisconnectAccountResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DisconnectAccountResponse>, I>>(base?: I): DisconnectAccountResponse {
    return DisconnectAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisconnectAccountResponse>, I>>(object: I): DisconnectAccountResponse {
    const message = createBaseDisconnectAccountResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseVerifyEmailRequest(): VerifyEmailRequest {
  return { aid: "", uid: "", token: "" };
}

export const VerifyEmailRequest = {
  encode(message: VerifyEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aid !== "") {
      writer.uint32(10).string(message.aid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.aid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyEmailRequest {
    return {
      aid: isSet(object.aid) ? globalThis.String(object.aid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      token: isSet(object.token) ? globalThis.String(object.token) : "",
    };
  },

  toJSON(message: VerifyEmailRequest): unknown {
    const obj: any = {};
    if (message.aid !== "") {
      obj.aid = message.aid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyEmailRequest>, I>>(base?: I): VerifyEmailRequest {
    return VerifyEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyEmailRequest>, I>>(object: I): VerifyEmailRequest {
    const message = createBaseVerifyEmailRequest();
    message.aid = object.aid ?? "";
    message.uid = object.uid ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseVerifyAccountResponse(): VerifyAccountResponse {
  return { success: undefined, error: undefined };
}

export const VerifyAccountResponse = {
  encode(message: VerifyAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== undefined) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyAccountResponse();
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

  fromJSON(object: any): VerifyAccountResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: VerifyAccountResponse): unknown {
    const obj: any = {};
    if (message.success !== undefined) {
      obj.success = message.success;
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerifyAccountResponse>, I>>(base?: I): VerifyAccountResponse {
    return VerifyAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerifyAccountResponse>, I>>(object: I): VerifyAccountResponse {
    const message = createBaseVerifyAccountResponse();
    message.success = object.success ?? undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseValidatePasswordRequest(): ValidatePasswordRequest {
  return { username: "", password: "", cid: "" };
}

export const ValidatePasswordRequest = {
  encode(message: ValidatePasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.cid !== "") {
      writer.uint32(26).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ValidatePasswordRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
    };
  },

  toJSON(message: ValidatePasswordRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePasswordRequest>, I>>(base?: I): ValidatePasswordRequest {
    return ValidatePasswordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePasswordRequest>, I>>(object: I): ValidatePasswordRequest {
    const message = createBaseValidatePasswordRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.cid = object.cid ?? "";
    return message;
  },
};

function createBaseRequestVerificationRequest(): RequestVerificationRequest {
  return { aid: "" };
}

export const RequestVerificationRequest = {
  encode(message: RequestVerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aid !== "") {
      writer.uint32(10).string(message.aid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestVerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestVerificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.aid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestVerificationRequest {
    return { aid: isSet(object.aid) ? globalThis.String(object.aid) : "" };
  },

  toJSON(message: RequestVerificationRequest): unknown {
    const obj: any = {};
    if (message.aid !== "") {
      obj.aid = message.aid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestVerificationRequest>, I>>(base?: I): RequestVerificationRequest {
    return RequestVerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestVerificationRequest>, I>>(object: I): RequestVerificationRequest {
    const message = createBaseRequestVerificationRequest();
    message.aid = object.aid ?? "";
    return message;
  },
};

function createBaseRequestVerificationResponse(): RequestVerificationResponse {
  return { verification: undefined, error: undefined };
}

export const RequestVerificationResponse = {
  encode(message: RequestVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verification !== undefined) {
      writer.uint32(10).string(message.verification);
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verification = reader.string();
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

  fromJSON(object: any): RequestVerificationResponse {
    return {
      verification: isSet(object.verification) ? globalThis.String(object.verification) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: RequestVerificationResponse): unknown {
    const obj: any = {};
    if (message.verification !== undefined) {
      obj.verification = message.verification;
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestVerificationResponse>, I>>(base?: I): RequestVerificationResponse {
    return RequestVerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestVerificationResponse>, I>>(object: I): RequestVerificationResponse {
    const message = createBaseRequestVerificationResponse();
    message.verification = object.verification ?? undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseAccount(): Account {
  return {
    id: "",
    uid: "",
    cid: "",
    password: undefined,
    verified: undefined,
    verificationToken: undefined,
    verificationExpires: undefined,
    sub: undefined,
    issuer: undefined,
    name: undefined,
    username: undefined,
    email: undefined,
    idToken: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  };
}

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.cid !== "") {
      writer.uint32(26).string(message.cid);
    }
    if (message.password !== undefined) {
      writer.uint32(34).string(message.password);
    }
    if (message.verified !== undefined) {
      writer.uint32(40).bool(message.verified);
    }
    if (message.verificationToken !== undefined) {
      writer.uint32(50).string(message.verificationToken);
    }
    if (message.verificationExpires !== undefined) {
      writer.uint32(56).int64(message.verificationExpires);
    }
    if (message.sub !== undefined) {
      writer.uint32(66).string(message.sub);
    }
    if (message.issuer !== undefined) {
      writer.uint32(74).string(message.issuer);
    }
    if (message.name !== undefined) {
      writer.uint32(82).string(message.name);
    }
    if (message.username !== undefined) {
      writer.uint32(90).string(message.username);
    }
    if (message.email !== undefined) {
      writer.uint32(98).string(message.email);
    }
    if (message.idToken !== undefined) {
      writer.uint32(106).string(message.idToken);
    }
    if (message.accessToken !== undefined) {
      writer.uint32(114).string(message.accessToken);
    }
    if (message.refreshToken !== undefined) {
      writer.uint32(122).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
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

          message.uid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cid = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.password = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.verified = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.verificationToken = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.verificationExpires = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sub = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.name = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.username = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.email = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.idToken = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : undefined,
      verified: isSet(object.verified) ? globalThis.Boolean(object.verified) : undefined,
      verificationToken: isSet(object.verificationToken) ? globalThis.String(object.verificationToken) : undefined,
      verificationExpires: isSet(object.verificationExpires)
        ? globalThis.Number(object.verificationExpires)
        : undefined,
      sub: isSet(object.sub) ? globalThis.String(object.sub) : undefined,
      issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      idToken: isSet(object.idToken) ? globalThis.String(object.idToken) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : undefined,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.cid !== "") {
      obj.cid = message.cid;
    }
    if (message.password !== undefined) {
      obj.password = message.password;
    }
    if (message.verified !== undefined) {
      obj.verified = message.verified;
    }
    if (message.verificationToken !== undefined) {
      obj.verificationToken = message.verificationToken;
    }
    if (message.verificationExpires !== undefined) {
      obj.verificationExpires = Math.round(message.verificationExpires);
    }
    if (message.sub !== undefined) {
      obj.sub = message.sub;
    }
    if (message.issuer !== undefined) {
      obj.issuer = message.issuer;
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.idToken !== undefined) {
      obj.idToken = message.idToken;
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== undefined) {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
    return Account.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = createBaseAccount();
    message.id = object.id ?? "";
    message.uid = object.uid ?? "";
    message.cid = object.cid ?? "";
    message.password = object.password ?? undefined;
    message.verified = object.verified ?? undefined;
    message.verificationToken = object.verificationToken ?? undefined;
    message.verificationExpires = object.verificationExpires ?? undefined;
    message.sub = object.sub ?? undefined;
    message.issuer = object.issuer ?? undefined;
    message.name = object.name ?? undefined;
    message.username = object.username ?? undefined;
    message.email = object.email ?? undefined;
    message.idToken = object.idToken ?? undefined;
    message.accessToken = object.accessToken ?? undefined;
    message.refreshToken = object.refreshToken ?? undefined;
    return message;
  },
};

function createBaseAccountResponse(): AccountResponse {
  return { account: undefined, error: undefined };
}

export const AccountResponse = {
  encode(message: AccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = Account.decode(reader, reader.uint32());
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

  fromJSON(object: any): AccountResponse {
    return {
      account: isSet(object.account) ? Account.fromJSON(object.account) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: AccountResponse): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = Account.toJSON(message.account);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountResponse>, I>>(base?: I): AccountResponse {
    return AccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountResponse>, I>>(object: I): AccountResponse {
    const message = createBaseAccountResponse();
    message.account = (object.account !== undefined && object.account !== null)
      ? Account.fromPartial(object.account)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface AccountService {
  GetAccount(request: GetAccountRequest): Promise<AccountResponse>;
  GetAccountByUsername(request: GetAccountByUsernameRequest): Promise<AccountResponse>;
  Update(request: UpdateAccountRequest): Promise<AccountResponse>;
  Connect(request: ConnectAccountRequest): Promise<AccountResponse>;
  Disconnect(request: DisconnectAccountRequest): Promise<DisconnectAccountResponse>;
  /** username-password connections */
  ValidatePassword(request: ValidatePasswordRequest): Promise<VerifyAccountResponse>;
  VerifyEmail(request: VerifyEmailRequest): Promise<VerifyAccountResponse>;
  RequestVerification(request: RequestVerificationRequest): Promise<RequestVerificationResponse>;
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
