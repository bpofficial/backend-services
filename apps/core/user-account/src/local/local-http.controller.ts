import { ResponseBuilder } from '@app/shared/responses';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { LocalAccountService } from './local-account.service';

@Controller('accounts')
export class LocalAccountHttpController {
    constructor(private accountService: LocalAccountService) {}

    @Post(`/verify`)
    @HttpCode(HttpStatusCode.Ok)
    async verifyEmail(
        @Res() res: Response,
        @Body() data: { aid: string; uid: string; token: string },
    ) {
        const result = await this.accountService.verifyEmail(
            data.aid,
            data.uid,
            data.token,
        );

        const response = new ResponseBuilder(res);
        if (!result.success)
            return response.setError('Invalid token').toJSON(400);

        return response.setData(null).toJSON(200);
    }
}
