/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export interface CreateRoleRequest {
  name: string;
  permissions: string[];
  oid: string;
}

export interface GetRoleRequest {
  rid: string;
  oid: string;
}

export interface ListRolesRequest {
  page: number;
  pageSize: number;
  oid: string;
}

export interface UpdateRoleRequest {
  rid: string;
  permissions: string[];
  oid: string;
}

export interface DeleteRoleRequest {
  rid: string;
  oid: string;
}

export interface DeleteRoleResponse {
  success: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  oid: string;
}

export interface ListRolesResponse {
  roles: Role[];
}

export interface RoleResponse {
  role?: Role | undefined;
  notfound?: NotFound | undefined;
}

export interface NotFound {
  /** Optionally, provide additional information about why the Org wasn't found */
  reason?: string | undefined;
}

function createBaseCreateRoleRequest(): CreateRoleRequest {
  return { name: "", permissions: [], oid: "" };
}

export const CreateRoleRequest = {
  encode(message: CreateRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.permissions) {
      writer.uint32(18).string(v!);
    }
    if (message.oid !== "") {
      writer.uint32(26).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoleRequest();
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

          message.permissions.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): CreateRoleRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => globalThis.String(e))
        : [],
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: CreateRoleRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(base?: I): CreateRoleRequest {
    return CreateRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(object: I): CreateRoleRequest {
    const message = createBaseCreateRoleRequest();
    message.name = object.name ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseGetRoleRequest(): GetRoleRequest {
  return { rid: "", oid: "" };
}

export const GetRoleRequest = {
  encode(message: GetRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rid !== "") {
      writer.uint32(10).string(message.rid);
    }
    if (message.oid !== "") {
      writer.uint32(18).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetRoleRequest {
    return {
      rid: isSet(object.rid) ? globalThis.String(object.rid) : "",
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: GetRoleRequest): unknown {
    const obj: any = {};
    if (message.rid !== "") {
      obj.rid = message.rid;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetRoleRequest>, I>>(base?: I): GetRoleRequest {
    return GetRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetRoleRequest>, I>>(object: I): GetRoleRequest {
    const message = createBaseGetRoleRequest();
    message.rid = object.rid ?? "";
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseListRolesRequest(): ListRolesRequest {
  return { page: 0, pageSize: 0, oid: "" };
}

export const ListRolesRequest = {
  encode(message: ListRolesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).int32(message.page);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.oid !== "") {
      writer.uint32(26).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ListRolesRequest {
    return {
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: ListRolesRequest): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesRequest>, I>>(base?: I): ListRolesRequest {
    return ListRolesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListRolesRequest>, I>>(object: I): ListRolesRequest {
    const message = createBaseListRolesRequest();
    message.page = object.page ?? 0;
    message.pageSize = object.pageSize ?? 0;
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseUpdateRoleRequest(): UpdateRoleRequest {
  return { rid: "", permissions: [], oid: "" };
}

export const UpdateRoleRequest = {
  encode(message: UpdateRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rid !== "") {
      writer.uint32(10).string(message.rid);
    }
    for (const v of message.permissions) {
      writer.uint32(18).string(v!);
    }
    if (message.oid !== "") {
      writer.uint32(26).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.permissions.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): UpdateRoleRequest {
    return {
      rid: isSet(object.rid) ? globalThis.String(object.rid) : "",
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => globalThis.String(e))
        : [],
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: UpdateRoleRequest): unknown {
    const obj: any = {};
    if (message.rid !== "") {
      obj.rid = message.rid;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(base?: I): UpdateRoleRequest {
    return UpdateRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(object: I): UpdateRoleRequest {
    const message = createBaseUpdateRoleRequest();
    message.rid = object.rid ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseDeleteRoleRequest(): DeleteRoleRequest {
  return { rid: "", oid: "" };
}

export const DeleteRoleRequest = {
  encode(message: DeleteRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rid !== "") {
      writer.uint32(10).string(message.rid);
    }
    if (message.oid !== "") {
      writer.uint32(18).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): DeleteRoleRequest {
    return {
      rid: isSet(object.rid) ? globalThis.String(object.rid) : "",
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: DeleteRoleRequest): unknown {
    const obj: any = {};
    if (message.rid !== "") {
      obj.rid = message.rid;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(base?: I): DeleteRoleRequest {
    return DeleteRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(object: I): DeleteRoleRequest {
    const message = createBaseDeleteRoleRequest();
    message.rid = object.rid ?? "";
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseDeleteRoleResponse(): DeleteRoleResponse {
  return { success: false };
}

export const DeleteRoleResponse = {
  encode(message: DeleteRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleResponse();
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

  fromJSON(object: any): DeleteRoleResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteRoleResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleResponse>, I>>(base?: I): DeleteRoleResponse {
    return DeleteRoleResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteRoleResponse>, I>>(object: I): DeleteRoleResponse {
    const message = createBaseDeleteRoleResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseRole(): Role {
  return { id: "", name: "", permissions: [], oid: "" };
}

export const Role = {
  encode(message: Role, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.permissions) {
      writer.uint32(26).string(v!);
    }
    if (message.oid !== "") {
      writer.uint32(34).string(message.oid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Role {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRole();
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

          message.permissions.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): Role {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => globalThis.String(e))
        : [],
      oid: isSet(object.oid) ? globalThis.String(object.oid) : "",
    };
  },

  toJSON(message: Role): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions;
    }
    if (message.oid !== "") {
      obj.oid = message.oid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Role>, I>>(base?: I): Role {
    return Role.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Role>, I>>(object: I): Role {
    const message = createBaseRole();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    message.oid = object.oid ?? "";
    return message;
  },
};

function createBaseListRolesResponse(): ListRolesResponse {
  return { roles: [] };
}

export const ListRolesResponse = {
  encode(message: ListRolesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.roles) {
      Role.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.roles.push(Role.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListRolesResponse {
    return { roles: globalThis.Array.isArray(object?.roles) ? object.roles.map((e: any) => Role.fromJSON(e)) : [] };
  },

  toJSON(message: ListRolesResponse): unknown {
    const obj: any = {};
    if (message.roles?.length) {
      obj.roles = message.roles.map((e) => Role.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesResponse>, I>>(base?: I): ListRolesResponse {
    return ListRolesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListRolesResponse>, I>>(object: I): ListRolesResponse {
    const message = createBaseListRolesResponse();
    message.roles = object.roles?.map((e) => Role.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRoleResponse(): RoleResponse {
  return { role: undefined, notfound: undefined };
}

export const RoleResponse = {
  encode(message: RoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role !== undefined) {
      Role.encode(message.role, writer.uint32(10).fork()).ldelim();
    }
    if (message.notfound !== undefined) {
      NotFound.encode(message.notfound, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoleResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.role = Role.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.notfound = NotFound.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RoleResponse {
    return {
      role: isSet(object.role) ? Role.fromJSON(object.role) : undefined,
      notfound: isSet(object.notfound) ? NotFound.fromJSON(object.notfound) : undefined,
    };
  },

  toJSON(message: RoleResponse): unknown {
    const obj: any = {};
    if (message.role !== undefined) {
      obj.role = Role.toJSON(message.role);
    }
    if (message.notfound !== undefined) {
      obj.notfound = NotFound.toJSON(message.notfound);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RoleResponse>, I>>(base?: I): RoleResponse {
    return RoleResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RoleResponse>, I>>(object: I): RoleResponse {
    const message = createBaseRoleResponse();
    message.role = (object.role !== undefined && object.role !== null) ? Role.fromPartial(object.role) : undefined;
    message.notfound = (object.notfound !== undefined && object.notfound !== null)
      ? NotFound.fromPartial(object.notfound)
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

export interface RoleService {
  CreateRole(request: CreateRoleRequest): Promise<Role>;
  GetRole(request: GetRoleRequest): Promise<RoleResponse>;
  ListRoles(request: ListRolesRequest): Promise<ListRolesResponse>;
  UpdateRole(request: UpdateRoleRequest): Promise<RoleResponse>;
  DeleteRole(request: DeleteRoleRequest): Promise<DeleteRoleResponse>;
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
