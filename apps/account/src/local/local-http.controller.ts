import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { LocalAccountService } from './local-account.service';

@Controller('accounts')
export class LocalAccountHttpController {
    constructor(private accountService: LocalAccountService) {}

    @Post(`/verify`)
    @HttpCode(HttpStatusCode.Ok)
    async verifyEmail(
        @Body() data: { aid: string; uid: string; token: string },
    ) {
        const result = await this.accountService.verifyEmail(
            data.aid,
            data.uid,
            data.token,
        );

        if (result.success) return { status: 'success', data: null };
    }
}
