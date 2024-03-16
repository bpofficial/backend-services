import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { NotifyGrpcController } from './grpc.controller';
import { NotifyService } from './notify.service';

@Module({
    imports: [SharedModule],
    controllers: [NotifyGrpcController],
    providers: [NotifyService],
})
export class NotifyModule {}
