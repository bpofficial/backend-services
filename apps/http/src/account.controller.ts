import { AccountServiceProvider } from '@app/clients';
import { AccountService, ConnectAccountRequest } from '@app/proto/account';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';

@Controller('accounts')
export class AccountHttpController {
    private readonly accountService: AccountService;

    constructor(private accountServiceProvider: AccountServiceProvider) {
        this.accountService = this.accountServiceProvider.getService();
    }

    @Get('/:id')
    @HttpCode(HttpStatusCode.Ok)
    async getAccount(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') aid: string,
    ) {
        const { account, error } = await this.accountService.GetAccount({
            aid,
            uid: req.user.id,
        });

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ account }).toJSON(200);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async connectAccount(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: ConnectAccountRequest,
    ) {
        const { account, error } = await this.accountService.Connect(data);

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ account }).toJSON(201);
    }

    @Delete(`/:id`)
    @HttpCode(HttpStatusCode.NoContent)
    async disconnectAccount(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') aid: string,
    ) {
        const { success } = await this.accountService.Disconnect({
            aid,
            uid: req.user.id,
        });

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to disconnect account').toJSON(500);
    }
}
