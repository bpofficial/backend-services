import { AccountServiceProvider } from '@app/clients';
import {
    AccountService,
    RequestVerificationRequest,
    VerifyEmailRequest,
} from '@app/proto/account';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

@Controller('accounts')
export class LocalAccountHttpController {
    private readonly accountService: AccountService;

    constructor(private accountServiceProvider: AccountServiceProvider) {
        this.accountService = this.accountServiceProvider.getService();
    }

    @Post(`/verify`)
    @HttpCode(HttpStatusCode.Ok)
    async verifyEmail(@Res() res: Response, @Body() data: VerifyEmailRequest) {
        const { error } = await this.accountService.VerifyEmail(data);

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData(null).toJSON(200);
    }

    @Post(`/request-verification`)
    @HttpCode(HttpStatusCode.Ok)
    async requestVerifyEmail(@Res() res: Response, @Query('aid') aid: string) {
        const { error } = await this.accountService.RequestVerification({
            aid,
        });

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData(null).toJSON(200);
    }
}
