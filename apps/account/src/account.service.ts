import { MongoModel } from '@app/db';
import {
    Account,
    AccountResponse,
    ConnectAccountRequest,
    DisconnectAccountRequest,
    DisconnectAccountResponse,
    GetAccountRequest,
} from '@app/proto/account';
import { Injectable, Logger } from '@nestjs/common';
import type { Model } from 'mongoose';

@Injectable()
export class AccountService {
    private readonly logger = new Logger('AccountService');

    constructor(@MongoModel('account') private model: Model<Account>) {}

    async getAccountById(req: GetAccountRequest): Promise<AccountResponse> {
        this.logger.debug(`getAccountById: aid=${req.aid}`);
        const result = await this.model.findById(req.aid);

        if (result) {
            return { account: Account.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getAccountById: not found, aid=${req.aid}`);
            return { error: { message: 'Not found' } };
        }
    }

    async connectAccount(req: ConnectAccountRequest): Promise<AccountResponse> {
        try {
            this.logger.debug(`connectAccount: `);

            const result = await this.model.create({
                uid: req.uid,
                ...req.createMask.reduce((acc, key) => {
                    acc[key] = req.account[key];
                    return acc;
                }, {} as Partial<Account>),
            });

            this.logger.debug(`createAccount: created, aid=${result.id}`);

            if (result) {
                return { account: Account.fromJSON(result.toJSON()) };
            }
        } catch (err) {
            return {
                error: {
                    message: 'Failed to create account',
                    info: err?.message,
                },
            };
        }

        return {
            error: {
                message: 'Failed to create account',
                info: 'Creation was falsy',
            },
        };
    }

    async disconnectAccount(
        req: DisconnectAccountRequest,
    ): Promise<DisconnectAccountResponse> {
        this.logger.debug(`deleteAccount: aid=${req.aid}`);
        const result = await this.model.deleteOne({
            _id: req.aid,
        });

        if (result.deletedCount) {
            this.logger.debug(`deleteAccount: deleted, mid=${req.aid}`);
            return { success: true };
        }

        this.logger.warn(`deleteAccount: not deleted, aid=${req.aid}`);
    }
}
