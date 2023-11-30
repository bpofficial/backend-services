/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";

export const protobufPackage = "proto";

export interface TypeEmail {
  subject: string;
  body: string;
  sender: string;
  cc: string[];
  bcc: string[];
}

export interface TypeSMS {
  message: string;
}

export interface SendRequest {
  recipient: string;
  email?: TypeEmail | undefined;
  sms?: TypeSMS | undefined;
}

export interface SendResponse {
  success?: boolean | undefined;
  error?: Err | undefined;
}

export interface BulkSendRequest {
  requests: SendRequest[];
}

export interface NotifyError {
  message: string;
  recipient: string;
}

export interface BulkSendResponse {
  errors: NotifyError[];
}

function createBaseTypeEmail(): TypeEmail {
  return { subject: "", body: "", sender: "", cc: [], bcc: [] };
}

export const TypeEmail = {
  encode(message: TypeEmail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subject !== "") {
      writer.uint32(10).string(message.subject);
    }
    if (message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    for (const v of message.cc) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.bcc) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypeEmail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeEmail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cc.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bcc.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TypeEmail {
    return {
      subject: isSet(object.subject) ? globalThis.String(object.subject) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      cc: globalThis.Array.isArray(object?.cc) ? object.cc.map((e: any) => globalThis.String(e)) : [],
      bcc: globalThis.Array.isArray(object?.bcc) ? object.bcc.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: TypeEmail): unknown {
    const obj: any = {};
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.body !== "") {
      obj.body = message.body;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.cc?.length) {
      obj.cc = message.cc;
    }
    if (message.bcc?.length) {
      obj.bcc = message.bcc;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TypeEmail>, I>>(base?: I): TypeEmail {
    return TypeEmail.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TypeEmail>, I>>(object: I): TypeEmail {
    const message = createBaseTypeEmail();
    message.subject = object.subject ?? "";
    message.body = object.body ?? "";
    message.sender = object.sender ?? "";
    message.cc = object.cc?.map((e) => e) || [];
    message.bcc = object.bcc?.map((e) => e) || [];
    return message;
  },
};

function createBaseTypeSMS(): TypeSMS {
  return { message: "" };
}

export const TypeSMS = {
  encode(message: TypeSMS, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypeSMS {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeSMS();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TypeSMS {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: TypeSMS): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TypeSMS>, I>>(base?: I): TypeSMS {
    return TypeSMS.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TypeSMS>, I>>(object: I): TypeSMS {
    const message = createBaseTypeSMS();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSendRequest(): SendRequest {
  return { recipient: "", email: undefined, sms: undefined };
}

export const SendRequest = {
  encode(message: SendRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.email !== undefined) {
      TypeEmail.encode(message.email, writer.uint32(18).fork()).ldelim();
    }
    if (message.sms !== undefined) {
      TypeSMS.encode(message.sms, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = TypeEmail.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sms = TypeSMS.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendRequest {
    return {
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      email: isSet(object.email) ? TypeEmail.fromJSON(object.email) : undefined,
      sms: isSet(object.sms) ? TypeSMS.fromJSON(object.sms) : undefined,
    };
  },

  toJSON(message: SendRequest): unknown {
    const obj: any = {};
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.email !== undefined) {
      obj.email = TypeEmail.toJSON(message.email);
    }
    if (message.sms !== undefined) {
      obj.sms = TypeSMS.toJSON(message.sms);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendRequest>, I>>(base?: I): SendRequest {
    return SendRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendRequest>, I>>(object: I): SendRequest {
    const message = createBaseSendRequest();
    message.recipient = object.recipient ?? "";
    message.email = (object.email !== undefined && object.email !== null)
      ? TypeEmail.fromPartial(object.email)
      : undefined;
    message.sms = (object.sms !== undefined && object.sms !== null) ? TypeSMS.fromPartial(object.sms) : undefined;
    return message;
  },
};

function createBaseSendResponse(): SendResponse {
  return { success: undefined, error: undefined };
}

export const SendResponse = {
  encode(message: SendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== undefined) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendResponse();
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

  fromJSON(object: any): SendResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendResponse): unknown {
    const obj: any = {};
    if (message.success !== undefined) {
      obj.success = message.success;
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendResponse>, I>>(base?: I): SendResponse {
    return SendResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendResponse>, I>>(object: I): SendResponse {
    const message = createBaseSendResponse();
    message.success = object.success ?? undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseBulkSendRequest(): BulkSendRequest {
  return { requests: [] };
}

export const BulkSendRequest = {
  encode(message: BulkSendRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.requests) {
      SendRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSendRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSendRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.requests.push(SendRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkSendRequest {
    return {
      requests: globalThis.Array.isArray(object?.requests)
        ? object.requests.map((e: any) => SendRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BulkSendRequest): unknown {
    const obj: any = {};
    if (message.requests?.length) {
      obj.requests = message.requests.map((e) => SendRequest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkSendRequest>, I>>(base?: I): BulkSendRequest {
    return BulkSendRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkSendRequest>, I>>(object: I): BulkSendRequest {
    const message = createBaseBulkSendRequest();
    message.requests = object.requests?.map((e) => SendRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNotifyError(): NotifyError {
  return { message: "", recipient: "" };
}

export const NotifyError = {
  encode(message: NotifyError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotifyError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotifyError();
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

          message.recipient = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotifyError {
    return {
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
    };
  },

  toJSON(message: NotifyError): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotifyError>, I>>(base?: I): NotifyError {
    return NotifyError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotifyError>, I>>(object: I): NotifyError {
    const message = createBaseNotifyError();
    message.message = object.message ?? "";
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseBulkSendResponse(): BulkSendResponse {
  return { errors: [] };
}

export const BulkSendResponse = {
  encode(message: BulkSendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.errors) {
      NotifyError.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSendResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.errors.push(NotifyError.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkSendResponse {
    return {
      errors: globalThis.Array.isArray(object?.errors) ? object.errors.map((e: any) => NotifyError.fromJSON(e)) : [],
    };
  },

  toJSON(message: BulkSendResponse): unknown {
    const obj: any = {};
    if (message.errors?.length) {
      obj.errors = message.errors.map((e) => NotifyError.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkSendResponse>, I>>(base?: I): BulkSendResponse {
    return BulkSendResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BulkSendResponse>, I>>(object: I): BulkSendResponse {
    const message = createBaseBulkSendResponse();
    message.errors = object.errors?.map((e) => NotifyError.fromPartial(e)) || [];
    return message;
  },
};

export interface NotifyService {
  Send(request: SendRequest): Promise<SendResponse>;
  SendBulk(request: BulkSendRequest): Promise<BulkSendResponse>;
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
