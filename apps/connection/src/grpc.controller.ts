import {
    ConnectionResponse,
    CreateConnectionRequest,
    DeleteConnectionRequest,
    DeleteConnectionResponse,
    GetConnectionRequest,
} from '@app/proto/connection';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConnectionService } from './connection.service';

@Controller()
export class ConnectionGrpcController {
    private readonly logger = new Logger('ConnectionController');

    constructor(private readonly connectionService: ConnectionService) {}

    @GrpcMethod('ConnectionService', 'GetConnection')
    async findConnectionById(
        data: GetConnectionRequest,
    ): Promise<ConnectionResponse> {
        this.logger.debug(`findConnectionById: cid=${data.cid}`);
        return this.connectionService.getConnectionById(data.cid);
    }

    @GrpcMethod('ConnectionService', 'Create')
    async createConnection(
        data: CreateConnectionRequest,
    ): Promise<ConnectionResponse> {
        this.logger.debug(`createConnection: name=${data.name}`);
        return this.connectionService.createConnection(data);
    }

    @GrpcMethod('ConnectionService', 'Delete')
    async deleteConnection(
        data: DeleteConnectionRequest,
    ): Promise<DeleteConnectionResponse> {
        this.logger.debug(`deleteConnection: cid=${data.cid}`);
        return this.connectionService.deleteConnection(data.cid);
    }
}
