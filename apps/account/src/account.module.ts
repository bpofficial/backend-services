import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountSchema } from './account.model';
import { AccountService } from './account.service';
import { AccountHttpController } from './http.controller';
import { LocalAccountHttpController } from './local/local-http.controller';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.account', { account: AccountSchema }),
    ],
    controllers: [
        AccountController,
        AccountHttpController,
        LocalAccountHttpController,
    ],
    providers: [AccountService],
})
export class AccountModule {}
