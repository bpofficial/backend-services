import { CreateUserRequest } from '@app/proto/user';
import { ErrorResponse, Response } from '@app/shared';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('account')
export class UserHttpController {
    constructor(private userService: UserService) {}

    @Get()
    async getMe() {
        const { user, error } = await this.userService.getUserById({ uid: '' });

        if (error || !user) {
            return new ErrorResponse({ ...error }).toErrorResponse();
        }

        return new Response({ account: user }).toResponse();
    }

    @Post()
    async createAccount(@Body() data: CreateUserRequest) {
        const account = await this.userService.createUser(data);

        if (account.error || !account.user) {
            return new ErrorResponse({ ...account.error }).toErrorResponse();
        }

        return new Response({ account }).toResponse();
    }

    @Post(`/verify`)
    async verifyEmail(@Body() data: { token: string }) {
        const result = await this.userService.verifyEmail('', data.token);
        if (result.success) return { status: 'success', data: null };
    }

    @Delete()
    async deleteAccount() {
        const { success } = await this.userService.deleteUser({ uid: '' });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to remove account',
        }).toFailureResponse();
    }
}
