import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserGrpcController } from './grpc.controller';
import { UserHttpController } from './http.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.user', { user: UserSchema }),
    ],
    controllers: [UserGrpcController, UserHttpController],
    providers: [UserService],
})
export class UserModule {}
