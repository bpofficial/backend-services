import { User as UserDef } from '@app/proto/user';

declare global {
    namespace Express {
        export interface Request {
            user: UserDef & { oid: string };
        }
    }
}

export {};
