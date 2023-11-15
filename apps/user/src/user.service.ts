import {
    CreateUserRequest,
    DeleteUserResponse,
    User,
    UserResponse,
} from '@app/proto/user';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    private readonly logger = new Logger('UserService');

    constructor(@InjectModel('user') private model: Model<User>) {}

    async getUserById(uid: string): Promise<UserResponse> {
        try {
            this.logger.debug(`getUserById: uid=${uid}`);
            const result = await this.model.findById(uid);

            if (result) {
                return { user: User.fromJSON(result.toJSON()) };
            } else {
                this.logger.warn(`getUserById: not found, uid=${uid}`);
                return { error: { message: 'Not found' } };
            }
        } catch (error: any) {
            this.logger.error(`getUserById: failed to get user by id=${uid}`, {
                error,
            });
        }

        return { error: { message: 'An error occured' } };
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
        } catch (error) {
            this.logger.error(`createUser: failed to create user`, {
                error,
                user: req,
            });
        }

        return {
            error: {
                message: 'Failed to create user',
            },
        };
    }

    async deleteUser(uid: string): Promise<DeleteUserResponse> {
        try {
            this.logger.debug(`deleteUser: uid=${uid}`);
            const result = await this.model.deleteOne({
                _id: uid,
            });

            if (result.deletedCount) {
                this.logger.debug(`deleteUser: deleted, mid=${uid}`);
                return DeleteUserResponse.create({ success: true });
            }

            this.logger.warn(`deleteUser: not deleted, uid=${uid}`);
        } catch (error) {
            this.logger.error(
                `deleteUser: failed to delete user with id=${uid}`,
                {
                    error,
                },
            );
        }

        return { success: false };
    }
}
