import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AccountSchema } from './account.model';
import { AccountService } from './account.service';
import { AccountGrpcController } from './grpc.controller';
import { AccountHttpController } from './http.controller';
import { LocalAccountService } from './local/local-account.service';
import { LocalAccountHttpController } from './local/local-http.controller';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.account', { account: AccountSchema }),
    ],
    controllers: [
        AccountGrpcController,
        AccountHttpController,
        LocalAccountHttpController,
    ],
    providers: [AccountService, LocalAccountService],
})
export class AccountModule {}
