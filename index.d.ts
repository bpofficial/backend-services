import { User as UserDef } from '@app/proto/user';
import { Strategy } from 'passport';

declare global {
    namespace Express {
        // Extend the existing User type
        export interface User extends UserDef {
            oid?: string; // Assuming 'oid' is not already part of UserDef
        }

        export interface Request {
            user?: User; // Override with the extended User type
            strategy?: Strategy;
        }
    }
}

export {};
