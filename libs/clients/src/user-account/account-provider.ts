import { AccountService } from '@app/proto/account';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AccountServiceProvider implements OnModuleInit {
    private accountService: AccountService;

    constructor(@Inject('account') private client: ClientGrpc) {}

    onModuleInit() {
        this.accountService =
            this.client.getService<AccountService>('AccountService');
    }

    getService(): AccountService {
        return this.accountService;
    }
}
