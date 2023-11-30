import { Controller } from '@nestjs/common';
import { LocalAccountService } from './local-account.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
    RequestVerificationRequest,
    ValidatePasswordRequest,
    VerifyEmailRequest,
} from '@app/proto/account';

@Controller()
export class LocalAccountGrpcController {
    constructor(private accountService: LocalAccountService) {}

    @GrpcMethod('ValidatePassword')
    async validatePassword(data: ValidatePasswordRequest) {
        return this.accountService.validatePassword(
            data.cid,
            data.username,
            data.password,
        );
    }

    @GrpcMethod('VerifyEmail')
    async verifyEmail(data: VerifyEmailRequest) {
        return this.accountService.verifyEmail(data.aid, data.uid, data.token);
    }

    @GrpcMethod('RequestVerification')
    async requestVerification(data: RequestVerificationRequest) {
        return this.accountService.requestVerification(data.aid);
    }
}
