import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OrgIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        req.user = {
            oid: decodedToken.oid,
            uid: decodedToken.uid,
            mid: decodedToken.mid,
        };
        next();
    }
}
