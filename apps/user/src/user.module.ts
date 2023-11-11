import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.user', { user: UserSchema }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
