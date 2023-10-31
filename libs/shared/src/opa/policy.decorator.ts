import { SetMetadata } from '@nestjs/common';

export function OpaPolicy(name: string) {
    return SetMetadata('policy', name);
}
