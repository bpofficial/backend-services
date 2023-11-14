import { CreateUserRequest } from '@app/proto/user';
import { Unauthorized } from '@app/shared/responses';
import { ResponseBuilder } from '@app/shared/responses/builders';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserHttpController {
    constructor(private userService: UserService) {}

    @Get('/@me')
    @HttpCode(HttpStatusCode.Ok)
    async getMe(@Req() req: Request, @Res() res: Response) {
        if (!req?.user?.id) return Unauthorized(res);

        const { user, error } = await this.userService.getUserById(req.user.id);

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON();
        if (!user) return response.setError('Not found').toJSON(404);
        return response.setData({ user }).toJSON(200);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async createUser(@Body() data: CreateUserRequest, @Res() res: Response) {
        const { user, error } = await this.userService.createUser(data);

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON();
        return response.setData({ user }).toJSON(201);
    }

    @Delete()
    @HttpCode(HttpStatusCode.NoContent)
    async deleteUser(@Req() req: Request, @Res() res: Response) {
        if (!req?.user?.id) return Unauthorized(res);

        const { success } = await this.userService.deleteUser(req.user.id);

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete user').toJSON(500);
    }
}
