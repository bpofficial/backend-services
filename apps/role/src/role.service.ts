import { MongoModel } from '@app/db';
import {
    CreateRoleRequest,
    DeleteRoleRequest,
    DeleteRoleResponse,
    GetRoleRequest,
    ListRolesRequest,
    ListRolesResponse,
    Role,
    RoleResponse,
    UpdateRoleRequest,
} from '@app/proto/role';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
    private readonly logger = new Logger('RoleService');

    constructor(@MongoModel('role') private model: Model<Role>) {}

    async getRole(req: GetRoleRequest): Promise<RoleResponse> {
        this.logger.debug(`getRole: oid=${req.oid}, rid=${req.rid}`);
        const result = await this.model.findOne({ _id: req.rid, oid: req.oid });

        if (result) {
            return RoleResponse.create({
                role: Role.fromJSON(result.toJSON()),
            });
        } else {
            this.logger.warn(
                `getRole: not found, oid=${req.oid}, rid=${req.rid}`,
            );
            return RoleResponse.create({ notfound: { reason: 'Not found' } });
        }
    }

    async createRole(req: CreateRoleRequest): Promise<Role> {
        this.logger.debug(`createRole: oid=${req.oid}, name=${req.name}`);
        const result = await this.model.create({
            oid: req.oid,
            name: req.name,
            permissions: req.permissions,
        });

        this.logger.debug(
            `createRole: created, oid=${req.oid}, name=${req.name}, rid=${result.id}`,
        );
        return Role.fromJSON(result.toJSON());
    }

    async listRoles(req: ListRolesRequest): Promise<ListRolesResponse> {
        this.logger.debug(
            `listRoles: oid=${req.oid}, page=${req.page}, pageSize=${req.pageSize}`,
        );
        const roles = await this.model
            .find({ oid: req.oid })
            .skip((req.page - 1) * req.pageSize)
            .limit(req.pageSize);

        return ListRolesResponse.create({
            roles: roles.map((role) => Role.fromJSON(role.toJSON())),
        });
    }

    async updateRole(req: UpdateRoleRequest): Promise<RoleResponse> {
        this.logger.debug(`updateRole: oid=${req.oid}, rid=${req.rid}`);
        const result = await this.model.findByIdAndUpdate(
            req.rid,
            { permissions: req.permissions },
            { new: true },
        );

        if (result) {
            return RoleResponse.create({
                role: Role.fromJSON(result.toJSON()),
            });
        } else {
            this.logger.warn(
                `updateRole: not found, oid=${req.oid}, rid=${req.rid}`,
            );
            return RoleResponse.create({ notfound: { reason: 'Not found' } });
        }
    }

    async deleteRole(req: DeleteRoleRequest): Promise<DeleteRoleResponse> {
        this.logger.debug(`deleteRole: rid=${req.rid}`);
        const result = await this.model.deleteOne({ _id: req.rid });

        if (result.deletedCount) {
            this.logger.debug(
                `deleteRole: deleted, oid=${req.oid}, rid=${req.rid}`,
            );
            return DeleteRoleResponse.create({ success: true });
        }

        this.logger.warn(
            `deleteRole: not deleted, oid=${req.oid}, rid=${req.rid}`,
        );
        return DeleteRoleResponse.create({ success: false });
    }
}
