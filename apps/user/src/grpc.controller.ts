import {
    CreateUserRequest,
    DeleteUserRequest,
    DeleteUserResponse,
    GetUserRequest,
    UserResponse,
} from '@app/proto/user';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserGrpcController {
    private readonly logger = new Logger('UserController');

    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService', 'GetUser')
    async findUserById(data: GetUserRequest): Promise<UserResponse> {
        this.logger.debug(`findUserById: uid=${data.uid}`);
        return this.userService.getUserById(data.uid);
    }

    @GrpcMethod('UserService', 'Create')
    async createUser(data: CreateUserRequest): Promise<UserResponse> {
        this.logger.debug(`createUser: name=${data.name}, email=${data.email}`);
        return this.userService.createUser(data);
    }

    @GrpcMethod('UserService', 'Delete')
    async deleteUser(data: DeleteUserRequest): Promise<DeleteUserResponse> {
        this.logger.debug(`deleteUser: uid=${data.uid}`);
        return this.userService.deleteUser(data.uid);
    }
}
