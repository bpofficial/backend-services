import { MongoModel } from '@app/db';
import {
    Connection,
    ConnectionResponse,
    CreateConnectionRequest,
    DeleteConnectionRequest,
    DeleteConnectionResponse,
    GetConnectionRequest,
} from '@app/proto/connection';
import { Injectable, Logger } from '@nestjs/common';
import type { Model } from 'mongoose';

@Injectable()
export class ConnectionService {
    private readonly logger = new Logger('ConnectionService');

    constructor(@MongoModel('connection') private model: Model<Connection>) {}

    async getConnectionById(
        req: GetConnectionRequest,
    ): Promise<ConnectionResponse> {
        this.logger.debug(`getConnectionById: cid=${req.cid}`);
        const result = await this.model.findById(req.cid);

        if (result) {
            return { connection: Connection.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getConnectionById: not found, cid=${req.cid}`);
            return { error: { message: 'Not found' } };
        }
    }

    async createConnection(
        req: CreateConnectionRequest,
    ): Promise<ConnectionResponse> {
        try {
            this.logger.debug(`createConnection: name=${req.name}`);

            const result = await this.model.create({
                oid: req.oid,
                name: req.name,
                key: req.key,
                type: req.type,
                config: req.config,
            });

            this.logger.debug(`createConnection: created, cid=${result.id}`);

            if (result) {
                return { connection: Connection.fromJSON(result.toJSON()) };
            }
        } catch (err) {
            return {
                error: {
                    message: 'Failed to create connection',
                    info: err?.message,
                },
            };
        }

        return {
            error: {
                message: 'Failed to create connection',
                info: 'Creation was falsy',
            },
        };
    }

    async deleteConnection(
        req: DeleteConnectionRequest,
    ): Promise<DeleteConnectionResponse> {
        this.logger.debug(`deleteConnection: cid=${req.cid}`);
        const result = await this.model.deleteOne({
            _id: req.cid,
        });

        if (result.deletedCount) {
            this.logger.debug(`deleteConnection: deleted, mid=${req.cid}`);
            return DeleteConnectionResponse.create({ success: true });
        }

        this.logger.warn(`deleteConnection: not deleted, cid=${req.cid}`);
    }
}
