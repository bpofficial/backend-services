import { UserService } from '@app/proto/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserServiceProvider implements OnModuleInit {
    private userService: UserService;

    constructor(@Inject('user') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<UserService>('UserService');
    }

    getService(): UserService {
        return this.userService;
    }
}
