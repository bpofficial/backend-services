import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleSchema } from './role.model';
import { RoleService } from './role.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.role', 'role', RoleSchema),
    ],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
