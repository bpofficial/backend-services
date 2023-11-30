import { ConnectionService } from '@app/proto/connection';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ConnectionServiceProvider implements OnModuleInit {
    private connectionService: ConnectionService;

    constructor(@Inject('connection') private client: ClientGrpc) {}

    onModuleInit() {
        this.connectionService =
            this.client.getService<ConnectionService>('ConnectionService');
    }

    getService(): ConnectionService {
        return this.connectionService;
    }
}
