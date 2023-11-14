import { Response } from 'express';
import { ResponseBuilder } from './builders';

function errorResponseFactory(cls: any) {
    return (response: Response) => {
        return new cls(response).toJSON();
    };
}

class UnauthorizedResponse {
    constructor(protected response: Response) {}

    toJSON() {
        return new ResponseBuilder(this.response)
            .setError('Unauthorized')
            .toJSON(401);
    }
}
export const Unauthorized = errorResponseFactory(UnauthorizedResponse);

class BadRequestResponse {
    constructor(protected response: Response) {}

    toJSON() {
        return new ResponseBuilder(this.response)
            .setError('Bad Request')
            .toJSON(400);
    }
}
export const BadRequest = errorResponseFactory(BadRequestResponse);
