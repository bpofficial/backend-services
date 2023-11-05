import {
    AccountResponse,
    ConnectAccountRequest,
    DisconnectAccountRequest,
    DisconnectAccountResponse,
    GetAccountRequest,
} from '@app/proto/account';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
    private readonly logger = new Logger('AccountController');

    constructor(private readonly accountService: AccountService) {}

    @GrpcMethod('AccountService', 'GetAccount')
    async findAccountById(data: GetAccountRequest): Promise<AccountResponse> {
        this.logger.debug(`findAccountById: aid=${data.aid}`);
        return this.accountService.getAccountById(data);
    }

    @GrpcMethod('AccountService', 'Connect')
    async createAccount(data: ConnectAccountRequest): Promise<AccountResponse> {
        this.logger.debug(`connectAccount: uid=${data.uid}`);
        return this.accountService.connectAccount(data);
    }

    @GrpcMethod('AccountService', 'Disconnect')
    async deleteAccount(
        data: DisconnectAccountRequest,
    ): Promise<DisconnectAccountResponse> {
        this.logger.debug(`disconnectAccount: aid=${data.aid}`);
        return this.accountService.disconnectAccount(data);
    }
}
