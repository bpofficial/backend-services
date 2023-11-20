import {
    Account,
    AccountResponse,
    ConnectAccountRequest,
    DisconnectAccountResponse,
} from '@app/proto/account';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
    private readonly logger = new Logger('AccountService');

    constructor(@InjectModel('account') private model: Model<Account>) {}

    async getAccountById(aid: string, uid: string): Promise<AccountResponse> {
        try {
            this.logger.debug(`getAccountById: aid=${aid}, uid=${uid}`);
            const result = await this.model.findOne({ id: aid, uid });

            if (result) {
                return { account: Account.fromJSON(result) };
            }
        } catch (error) {
            this.logger.error(
                `getAccountById: failed to get account, aid=${aid}`,
                { error: JSON.stringify(error) },
            );
        }

        this.logger.warn(`getAccountById: not found, aid=${aid}`);
        return { error: { message: 'Not found' } };
    }

    async connectAccount(req: ConnectAccountRequest): Promise<AccountResponse> {
        try {
            const result = await this.model.create({
                uid: req.uid,
                ...req.createMask.reduce((acc, key) => {
                    acc[key] = req.account[key];
                    return acc;
                }, {} as Partial<Account>),
            });

            if (result) {
                this.logger.debug(`createAccount: created, aid=${result.id}`);
                return { account: Account.fromJSON(result) };
            }
        } catch (error) {
            this.logger.error(
                `connectAccount: failed to connect account, uid=${req.uid}, cid=${req.cid}`,
                { error: JSON.stringify(error) },
            );

            return {
                error: {
                    message: 'Failed to create account',
                    info: error?.message,
                },
            };
        }

        this.logger.error(
            `connectAccount: failed to connect account (creation falsy), uid=${req.uid}, cid=${req.cid}`,
        );
        return {
            error: {
                message: 'Failed to create account',
                info: 'Creation was falsy',
            },
        };
    }

    async disconnectAccount(
        aid: string,
        uid: string,
    ): Promise<DisconnectAccountResponse> {
        try {
            this.logger.debug(`deleteAccount: aid=${aid}, uid=${uid}`);
            const result = await this.model.deleteOne({
                _id: aid,
                uid,
            });

            if (result.deletedCount) {
                this.logger.debug(
                    `deleteAccount: deleted, aid=${aid}, uid=${uid}`,
                );
                return { success: true };
            }
        } catch (error) {
            this.logger.error(
                `deleteAccount: failed to delete account, aid=${aid}, uid=${uid}`,
                { error: JSON.stringify(error) },
            );
        }

        this.logger.debug(`deleteAccount: not deleted, aid=${aid}, uid=${uid}`);
        return { success: false };
    }
}
