import {
    CreateRoleRequest,
    DeleteRoleResponse,
    GetRoleRequest,
    ListRolesRequest,
    ListRolesResponse,
    Role,
    RoleResponse,
    UpdateRoleRequest,
} from '@app/proto/role';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
    private readonly logger = new Logger('RoleController');

    constructor(private readonly roleService: RoleService) {}

    @GrpcMethod('RoleService', 'GetRole')
    async getRole(data: GetRoleRequest): Promise<RoleResponse> {
        this.logger.debug(`getRole: oid=${data.oid}, rid=${data.rid}`);
        return this.roleService.getRole(data);
    }

    @GrpcMethod('RoleService', 'ListRoles')
    async listRoles(data: ListRolesRequest): Promise<ListRolesResponse> {
        this.logger.debug(
            `listRoles: oid=${data.oid}, page=${data.page}, pageSize=${data.pageSize}`,
        );
        return this.roleService.listRoles(data);
    }

    @GrpcMethod('RoleService', 'CreateRole')
    async createRole(data: CreateRoleRequest): Promise<Role> {
        this.logger.debug(`createRole: oid=${data.oid}, name=${data.name}`);
        return this.roleService.createRole(data);
    }

    @GrpcMethod('RoleService', 'UpdateRole')
    async updateRole(data: UpdateRoleRequest): Promise<RoleResponse> {
        this.logger.debug(`updateRole: oid=${data.oid}, rid=${data.rid}`);
        return this.roleService.updateRole(data);
    }

    @GrpcMethod('RoleService', 'DeleteRole')
    async deleteRole(data: UpdateRoleRequest): Promise<DeleteRoleResponse> {
        this.logger.debug(`deleteRole: oid=${data.oid}, rid=${data.rid}`);
        return this.roleService.deleteRole(data);
    }
}
