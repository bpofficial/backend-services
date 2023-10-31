import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
    imports: [SharedModule],
    controllers: [OrgController],
    providers: [OrgService],
})
export class OrgModule {}
