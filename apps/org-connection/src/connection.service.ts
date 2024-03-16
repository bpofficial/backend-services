import {
    Connection,
    ConnectionResponse,
    CreateConnectionRequest,
    DeleteConnectionResponse,
} from '@app/proto/connection';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConnectionService {
    private readonly logger = new Logger('ConnectionService');

    constructor(@InjectModel('connection') private model: Model<Connection>) {}

    async getConnectionById(cid: string): Promise<ConnectionResponse> {
        try {
            this.logger.debug(`getConnectionById: cid=${cid}`);
            const result = await this.model.findById(cid);

            if (result) {
                return { connection: Connection.fromJSON(result) };
            }
        } catch (error) {
            this.logger.error(
                `getConnectionById: failed to get connection, cid=${cid}`,
                { error: JSON.stringify(error) },
            );

            return {
                error: {
                    message: 'An error occured finding the connection',
                    code: 500,
                },
            };
        }

        this.logger.warn(`getConnectionById: not found, cid=${cid}`);
        return { error: { message: 'Not found', code: 404 } };
    }

    async createConnection(
        req: CreateConnectionRequest,
    ): Promise<ConnectionResponse> {
        try {
            const result = await this.model.create({
                oid: req.oid,
                name: req.name,
                key: req.key,
                type: req.type,
                config: req.config,
            });

            if (result) {
                this.logger.debug(
                    `createConnection: created, cid=${result.id}`,
                );
                return { connection: Connection.fromJSON(result) };
            }
        } catch (error) {
            this.logger.error(`createConnection: failed to create connection`, {
                error: JSON.stringify(error),
                connection: req,
            });

            return {
                error: {
                    message: 'Failed to create connection',
                    info: error?.message,
                    code: 500,
                },
            };
        }

        return {
            error: {
                message: 'Failed to create connection',
                info: 'Creation was falsy',
                code: 500,
            },
        };
    }

    async deleteConnection(cid: string): Promise<DeleteConnectionResponse> {
        try {
            this.logger.debug(`deleteConnection: cid=${cid}`);
            const result = await this.model.deleteOne({
                _id: cid,
            });

            if (result.deletedCount) {
                this.logger.debug(`deleteConnection: deleted, cid=${cid}`);
                return { success: true };
            }
        } catch (error) {
            this.logger.error(
                `deleteConnection: failed to delete connection, cid=${cid}`,
                { error: JSON.stringify(error) },
            );
        }

        this.logger.debug(`deleteConnection: not deleted, cid=${cid}`);
        return { success: false };
    }
}
