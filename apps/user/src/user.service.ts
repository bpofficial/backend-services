import { MongoModel } from '@app/db';
import { Err } from '@app/proto/errors';
import {
    CreateUserRequest,
    DeleteUserRequest,
    DeleteUserResponse,
    GetUserRequest,
    User,
    UserResponse,
    VerifyUserResponse,
} from '@app/proto/user';
import { Injectable, Logger } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    private readonly logger = new Logger('UserService');

    constructor(@MongoModel('user') private model: Model<User>) {}

    async verifyEmail(uid: string, token: string): Promise<VerifyUserResponse> {
        const { user, error } = await this.getUserById({ uid });
        if (error) return { error };

        const isVerified = user.verified;
        if (isVerified) {
            return { error: Err.create({ message: 'Already verified' }) };
        }

        const { verificationToken, verificationExpiry } = user as any;

        const isExpired = Date.now() >= verificationExpiry;
        if (isExpired) {
            return { error: Err.create({ message: 'Expired' }) };
        }

        if (verificationToken === token) {
            await this.model.updateOne({ id: uid }, { verified: true });
            return { success: true };
        } else {
            return { error: Err.create({ message: 'Invalid token' }) };
        }
    }

    async requestVerification(uid: string) {
        const verificationToken = randomBytes(32).toString('hex');
        const verificationExpiry = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days

        await this.model.updateOne(
            { id: uid },
            {
                verificationToken,
                verificationExpiry,
            },
        );

        // TODO: dispatch an email to the user to verify their account
    }

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
                await this.requestVerification(result.id);
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
