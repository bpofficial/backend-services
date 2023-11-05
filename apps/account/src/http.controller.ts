import { ConnectAccountRequest } from '@app/proto/account';
import { ErrorResponse, Response } from '@app/shared';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Request,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountHttpController {
    constructor(private accountService: AccountService) {}

    @Get('/:id')
    @HttpCode(HttpStatusCode.Ok)
    async getAccount(@Request() req: any, @Param('id') aid: string) {
        const { account, error } = await this.accountService.getAccountById({
            uid: req.account.uid,
            aid,
        });

        if (error || !account) {
            return new ErrorResponse({ ...error }).toErrorResponse();
        }

        return new Response({ account }).toResponse();
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async connectAccount(@Body() data: ConnectAccountRequest) {
        const account = await this.accountService.connectAccount(data);

        if (account.error || !account.account) {
            return new ErrorResponse({ ...account.error }).toErrorResponse();
        }

        return new Response({ account }).toResponse();
    }

    @Delete(`/:id`)
    @HttpCode(HttpStatusCode.NoContent)
    async disconnectAccount(@Request() req: any, @Param('id') aid: string) {
        const { success } = await this.accountService.disconnectAccount({
            uid: req.user.uid,
            aid,
        });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to remove account',
        }).toFailureResponse();
    }
}
