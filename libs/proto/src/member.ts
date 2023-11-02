/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Err } from "./errors";

export const protobufPackage = "proto";

export interface CreateMemberRequest {
  oid: string;
  uid?: string | undefined;
  email?: string | undefined;
  role: string;
}

export interface ExistingUser {
  uid: string;
}

export interface AcceptInviteRequest {
  oid: string;
  uid: string;
  invitation: string;
}

export interface AcceptInviteResponse {
  success: boolean;
}

export interface CreateInviteRequest {
  oid: string;
  email: string;
  role: string;
}

export interface CreateInviteResponse {
  invitation: string;
}

export interface GetMemberRequest {
  oid: string;
  mid: string;
}

export interface DeleteMemberRequest {
  oid: string;
  mid: string;
}

export interface DeleteMemberResponse {
  success: boolean;
}

export interface DeleteAllMembersRequest {
  oid: string;
}

export interface DeleteAllMembersResponse {
  success: boolean;
}

export interface Member {
  id: string;
  oid: string;
  uid?: string | undefined;
  email?: string | undefined;
  role: string;
  accepted: boolean;
  invitation: string;
}

export interface MemberResponse {
  member?: Member | undefined;
  error?: Err | undefined;
}

function createBaseCreateMemberRequest(): CreateMemberRequest {
  return { oid: "", uid: undefined, email: undefined, role: "" };
}

export const CreateMemberRequest = {
  encode(message: CreateMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.uid !== undefined) {
      writer.uint32(18).string(message.uid);
    }
    if (message.email !== undefined) {
      writer.uint32(26).string(message.email);
    }
    if (message.role !== "") {
      writer.uint32(34).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateMemberRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.role = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateMemberRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      role: isSet(object.role) ? globalThis.String(object.role) : "",
    };
  },

  toJSON(message: CreateMemberRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.uid !== undefined) {
      obj.uid = message.uid;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.role !== "") {
      obj.role = message.role;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateMemberRequest>, I>>(base?: I): CreateMemberRequest {
    return CreateMemberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateMemberRequest>, I>>(object: I): CreateMemberRequest {
    const message = createBaseCreateMemberRequest();
    message.oid = object.oid ?? "";
    message.uid = object.uid ?? undefined;
    message.email = object.email ?? undefined;
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseExistingUser(): ExistingUser {
  return { uid: "" };
}

export const ExistingUser = {
  encode(message: ExistingUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExistingUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExistingUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): ExistingUser {
    return { uid: isSet(object.uid) ? globalThis.String(object.uid) : "" };
  },

  toJSON(message: ExistingUser): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExistingUser>, I>>(base?: I): ExistingUser {
    return ExistingUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExistingUser>, I>>(object: I): ExistingUser {
    const message = createBaseExistingUser();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseAcceptInviteRequest(): AcceptInviteRequest {
  return { oid: "", uid: "", invitation: "" };
}

export const AcceptInviteRequest = {
  encode(message: AcceptInviteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.invitation !== "") {
      writer.uint32(26).string(message.invitation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptInviteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptInviteRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.invitation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AcceptInviteRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      invitation: isSet(object.invitation) ? globalThis.String(object.invitation) : "",
    };
  },

  toJSON(message: AcceptInviteRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.invitation !== "") {
      obj.invitation = message.invitation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AcceptInviteRequest>, I>>(base?: I): AcceptInviteRequest {
    return AcceptInviteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AcceptInviteRequest>, I>>(object: I): AcceptInviteRequest {
    const message = createBaseAcceptInviteRequest();
    message.oid = object.oid ?? "";
    message.uid = object.uid ?? "";
    message.invitation = object.invitation ?? "";
    return message;
  },
};

function createBaseAcceptInviteResponse(): AcceptInviteResponse {
  return { success: false };
}

export const AcceptInviteResponse = {
  encode(message: AcceptInviteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptInviteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptInviteResponse();
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

  fromJSON(object: any): AcceptInviteResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: AcceptInviteResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AcceptInviteResponse>, I>>(base?: I): AcceptInviteResponse {
    return AcceptInviteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AcceptInviteResponse>, I>>(object: I): AcceptInviteResponse {
    const message = createBaseAcceptInviteResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseCreateInviteRequest(): CreateInviteRequest {
  return { oid: "", email: "", role: "" };
}

export const CreateInviteRequest = {
  encode(message: CreateInviteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInviteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteRequest();
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

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.role = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInviteRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      role: isSet(object.role) ? globalThis.String(object.role) : "",
    };
  },

  toJSON(message: CreateInviteRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.role !== "") {
      obj.role = message.role;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInviteRequest>, I>>(base?: I): CreateInviteRequest {
    return CreateInviteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInviteRequest>, I>>(object: I): CreateInviteRequest {
    const message = createBaseCreateInviteRequest();
    message.oid = object.oid ?? "";
    message.email = object.email ?? "";
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseCreateInviteResponse(): CreateInviteResponse {
  return { invitation: "" };
}

export const CreateInviteResponse = {
  encode(message: CreateInviteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitation !== "") {
      writer.uint32(10).string(message.invitation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInviteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInviteResponse {
    return { invitation: isSet(object.invitation) ? globalThis.String(object.invitation) : "" };
  },

  toJSON(message: CreateInviteResponse): unknown {
    const obj: any = {};
    if (message.invitation !== "") {
      obj.invitation = message.invitation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInviteResponse>, I>>(base?: I): CreateInviteResponse {
    return CreateInviteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInviteResponse>, I>>(object: I): CreateInviteResponse {
    const message = createBaseCreateInviteResponse();
    message.invitation = object.invitation ?? "";
    return message;
  },
};

function createBaseGetMemberRequest(): GetMemberRequest {
  return { oid: "", mid: "" };
}

export const GetMemberRequest = {
  encode(message: GetMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.mid !== "") {
      writer.uint32(18).string(message.mid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMemberRequest();
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

          message.mid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMemberRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      mid: isSet(object.mid) ? globalThis.String(object.mid) : "",
    };
  },

  toJSON(message: GetMemberRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.mid !== "") {
      obj.mid = message.mid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMemberRequest>, I>>(base?: I): GetMemberRequest {
    return GetMemberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMemberRequest>, I>>(object: I): GetMemberRequest {
    const message = createBaseGetMemberRequest();
    message.oid = object.oid ?? "";
    message.mid = object.mid ?? "";
    return message;
  },
};

function createBaseDeleteMemberRequest(): DeleteMemberRequest {
  return { oid: "", mid: "" };
}

export const DeleteMemberRequest = {
  encode(message: DeleteMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    if (message.mid !== "") {
      writer.uint32(18).string(message.mid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteMemberRequest();
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

          message.mid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteMemberRequest {
    return {
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      mid: isSet(object.mid) ? globalThis.String(object.mid) : "",
    };
  },

  toJSON(message: DeleteMemberRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.mid !== "") {
      obj.mid = message.mid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteMemberRequest>, I>>(base?: I): DeleteMemberRequest {
    return DeleteMemberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteMemberRequest>, I>>(object: I): DeleteMemberRequest {
    const message = createBaseDeleteMemberRequest();
    message.oid = object.oid ?? "";
    message.mid = object.mid ?? "";
    return message;
  },
};

function createBaseDeleteMemberResponse(): DeleteMemberResponse {
  return { success: false };
}

export const DeleteMemberResponse = {
  encode(message: DeleteMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteMemberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteMemberResponse();
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

  fromJSON(object: any): DeleteMemberResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteMemberResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteMemberResponse>, I>>(base?: I): DeleteMemberResponse {
    return DeleteMemberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteMemberResponse>, I>>(object: I): DeleteMemberResponse {
    const message = createBaseDeleteMemberResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseDeleteAllMembersRequest(): DeleteAllMembersRequest {
  return { oid: "" };
}

export const DeleteAllMembersRequest = {
  encode(message: DeleteAllMembersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== "") {
      writer.uint32(10).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAllMembersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteAllMembersRequest();
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

  fromJSON(object: any): DeleteAllMembersRequest {
    return { oid: isSet(object.oid) ? globalThis.String(object.oid) : "" };
  },

  toJSON(message: DeleteAllMembersRequest): unknown {
    const obj: any = {};
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteAllMembersRequest>, I>>(base?: I): DeleteAllMembersRequest {
    return DeleteAllMembersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteAllMembersRequest>, I>>(object: I): DeleteAllMembersRequest {
    const message = createBaseDeleteAllMembersRequest();
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseDeleteAllMembersResponse(): DeleteAllMembersResponse {
  return { success: false };
}

export const DeleteAllMembersResponse = {
  encode(message: DeleteAllMembersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAllMembersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteAllMembersResponse();
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

  fromJSON(object: any): DeleteAllMembersResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteAllMembersResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteAllMembersResponse>, I>>(base?: I): DeleteAllMembersResponse {
    return DeleteAllMembersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteAllMembersResponse>, I>>(object: I): DeleteAllMembersResponse {
    const message = createBaseDeleteAllMembersResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMember(): Member {
  return { id: "", oid: "", uid: undefined, email: undefined, role: "", accepted: false, invitation: "" };
}

export const Member = {
  encode(message: Member, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.oid !== "") {
      writer.uint32(18).string(message.oid);
    }
    if (message.uid !== undefined) {
      writer.uint32(26).string(message.uid);
    }
    if (message.email !== undefined) {
      writer.uint32(34).string(message.email);
    }
    if (message.role !== "") {
      writer.uint32(42).string(message.role);
    }
    if (message.accepted === true) {
      writer.uint32(48).bool(message.accepted);
    }
    if (message.invitation !== "") {
      writer.uint32(58).string(message.invitation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Member {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMember();
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

          message.uid = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.email = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.role = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.accepted = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.invitation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Member {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      role: isSet(object.role) ? globalThis.String(object.role) : "",
      accepted: isSet(object.accepted) ? globalThis.Boolean(object.accepted) : false,
      invitation: isSet(object.invitation) ? globalThis.String(object.invitation) : "",
    };
  },

  toJSON(message: Member): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    if (message.uid !== undefined) {
      obj.uid = message.uid;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.role !== "") {
      obj.role = message.role;
    }
    if (message.accepted === true) {
      obj.accepted = message.accepted;
    }
    if (message.invitation !== "") {
      obj.invitation = message.invitation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Member>, I>>(base?: I): Member {
    return Member.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Member>, I>>(object: I): Member {
    const message = createBaseMember();
    message.id = object.id ?? "";
    message.oid = object.oid ?? "";
    message.uid = object.uid ?? undefined;
    message.email = object.email ?? undefined;
    message.role = object.role ?? "";
    message.accepted = object.accepted ?? false;
    message.invitation = object.invitation ?? "";
    return message;
  },
};

function createBaseMemberResponse(): MemberResponse {
  return { member: undefined, error: undefined };
}

export const MemberResponse = {
  encode(message: MemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.member !== undefined) {
      Member.encode(message.member, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Err.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.member = Member.decode(reader, reader.uint32());
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

  fromJSON(object: any): MemberResponse {
    return {
      member: isSet(object.member) ? Member.fromJSON(object.member) : undefined,
      error: isSet(object.error) ? Err.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: MemberResponse): unknown {
    const obj: any = {};
    if (message.member !== undefined) {
      obj.member = Member.toJSON(message.member);
    }
    if (message.error !== undefined) {
      obj.error = Err.toJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemberResponse>, I>>(base?: I): MemberResponse {
    return MemberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemberResponse>, I>>(object: I): MemberResponse {
    const message = createBaseMemberResponse();
    message.member = (object.member !== undefined && object.member !== null)
      ? Member.fromPartial(object.member)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Err.fromPartial(object.error) : undefined;
    return message;
  },
};

export interface MemberService {
  GetMember(request: GetMemberRequest): Promise<MemberResponse>;
  AcceptInvite(request: AcceptInviteRequest): Promise<AcceptInviteResponse>;
  CreateInvite(request: CreateInviteRequest): Promise<CreateInviteResponse>;
  Create(request: CreateMemberRequest): Promise<Member>;
  Delete(request: DeleteMemberRequest): Promise<DeleteMemberResponse>;
  DeleteAll(request: DeleteAllMembersRequest): Promise<DeleteAllMembersResponse>;
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
