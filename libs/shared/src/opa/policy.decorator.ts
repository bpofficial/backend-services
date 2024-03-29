import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { OpaGuard } from './opa.guard';

export function OpaPolicy(name: string, permission?: string | string[]) {
    return applyDecorators(
        UseGuards(OpaGuard),
        SetMetadata('policy', name),
        SetMetadata('permission', permission ?? null),
    );
}
