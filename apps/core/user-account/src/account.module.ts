import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AccountSchema } from './account.model';
import { AccountService } from './account.service';
import { AccountGrpcController } from './grpc.controller';
import { UsernamePasswordAccountService } from './methods/Username-Password/username-password.service';
import { UsernamePasswordGrpcController } from './methods/Username-Password/username-password-grpc.controller';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.account', { account: AccountSchema }),
    ],
    controllers: [AccountGrpcController, UsernamePasswordGrpcController],
    providers: [AccountService, UsernamePasswordAccountService],
})
export class AccountModule {}
