import { User as UserDef } from '@app/proto/user';

declare global {
    namespace Express {
        export type User = UserDef & { oid: string };
        export interface Request {
            user: UserDef & { oid: string };
        }
    }
}

export {};
