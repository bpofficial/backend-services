import { CreateUserRequest } from '@app/proto/user';
import { ErrorResponse, Response } from '@app/shared';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Request,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { UserService } from './user.service';

@Controller('account')
export class UserHttpController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(HttpStatusCode.Ok)
    async getMe(@Request() req: any) {
        const { user, error } = await this.userService.getUserById({
            uid: req.user.uid,
        });

        if (error || !user) {
            return new ErrorResponse({ ...error }).toErrorResponse();
        }

        return new Response({ account: user }).toResponse();
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async createAccount(@Body() data: CreateUserRequest) {
        const account = await this.userService.createUser(data);

        if (account.error || !account.user) {
            return new ErrorResponse({ ...account.error }).toErrorResponse();
        }

        return new Response({ account }).toResponse();
    }

    @Delete()
    @HttpCode(HttpStatusCode.NoContent)
    async deleteAccount(@Request() req: any) {
        const { success } = await this.userService.deleteUser({
            uid: req.user.uid,
        });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to remove account',
        }).toFailureResponse();
    }
}
