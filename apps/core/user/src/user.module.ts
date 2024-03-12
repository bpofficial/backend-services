import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserGrpcController } from './grpc.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.user', { user: UserSchema }),
    ],
    controllers: [UserGrpcController],
    providers: [UserService],
})
export class UserModule {}
