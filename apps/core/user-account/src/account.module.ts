import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AccountSchema } from './account.model';
import { AccountService } from './account.service';
import { AccountGrpcController } from './grpc.controller';
import { LocalAccountService } from './local/local-account.service';
import { LocalAccountGrpcController } from './local/local-grpc.controller';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.account', { account: AccountSchema }),
    ],
    controllers: [AccountGrpcController, LocalAccountGrpcController],
    providers: [AccountService, LocalAccountService],
})
export class AccountModule {}
