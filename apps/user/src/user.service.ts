import { MongoModel } from '@app/db';
import {
    CreateUserRequest,
    DeleteUserRequest,
    DeleteUserResponse,
    GetUserRequest,
    User,
    UserResponse,
} from '@app/proto/user';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    private readonly logger = new Logger('UserService');

    constructor(@MongoModel('user') private model: Model<User>) {}

    async getUserById(req: GetUserRequest): Promise<UserResponse> {
        this.logger.debug(`getUserById: uid=${req.uid}`);
        const result = await this.model.findById(req.uid);

        if (result) {
            return { user: User.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getUserById: not found, uid=${req.uid}`);
            return { error: { message: 'Not found' } };
        }
    }

    async createUser(req: CreateUserRequest): Promise<UserResponse> {
        try {
            this.logger.debug(
                `createUser: name=${req.name}, email=${req.email}`,
            );

            const result = await this.model.create({
                email: req.email,
                name: req.name,
            });

            this.logger.debug(`createUser: created, uid=${result.id}`);

            if (result) {
                return { user: User.fromJSON(result.toJSON()) };
            }
        } catch (err) {
            return {
                error: { message: 'Failed to create user', info: err?.message },
            };
        }

        return {
            error: {
                message: 'Failed to create user',
                info: 'Creation was falsy',
            },
        };
    }

    async deleteUser(req: DeleteUserRequest): Promise<DeleteUserResponse> {
        this.logger.debug(`deleteUser: uid=${req.uid}`);
        const result = await this.model.deleteOne({
            _id: req.uid,
        });

        if (result.deletedCount) {
            this.logger.debug(`deleteUser: deleted, mid=${req.uid}`);
            return DeleteUserResponse.create({ success: true });
        }

        this.logger.warn(`deleteUser: not deleted, uid=${req.uid}`);
    }
}
