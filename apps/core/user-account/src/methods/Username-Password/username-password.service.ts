import {
    RequestVerificationResponse,
    VerifyAccountResponse,
} from '@app/proto/account';
import { Err } from '@app/proto/errors';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { AccountModel } from '../../account.model';
import { AccountService } from '../../account.service';

@Injectable()
export class UsernamePasswordAccountService {
    private readonly logger = new Logger('LocalAccountService');

    constructor(
        @InjectModel('account') private model: Model<AccountModel>,
        private accountService: AccountService,
    ) {}

    async validatePassword(
        cid: string,
        username: string,
        password: string,
    ): Promise<VerifyAccountResponse> {
        return { error: { message: 'Not implemented', code: 501 } };
    }

    async verifyEmail(
        aid: string,
        uid: string,
        token: string,
    ): Promise<VerifyAccountResponse> {
        const { account, error } = await this.accountService.getAccountById(
            aid,
            uid,
        );

        if (error) return { error };

        const isVerified = account.verified;
        if (isVerified) {
            return { error: Err.create({ message: 'Already verified' }) };
        }

        const { verificationToken, verificationExpiry } = account as any;

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

    async requestVerification(
        aid: string,
    ): Promise<RequestVerificationResponse> {
        const verificationToken = randomBytes(32).toString('hex');
        const verificationExpiry = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days

        await this.model.updateOne(
            { _id: aid },
            {
                verificationToken,
                verificationExpiry,
            },
        );

        // TODO: dispatch an email to the account to verify their account

        return {
            error: { message: 'Not implemented', code: 501 },
        };
    }
}
