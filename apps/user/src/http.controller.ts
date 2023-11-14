import { CreateUserRequest } from '@app/proto/user';
import { Unauthorized } from '@app/shared/responses';
import { ResponseBuilder } from '@app/shared/responses/builders';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserHttpController {
    private readonly logger = new Logger('UserHttpController');

    constructor(private userService: UserService) {}

    @Get('/@me')
    @HttpCode(200)
    async getMe(@Req() req: Request, @Res() res: Response) {
        this.logger.debug(`GET /@me`);
        if (!req?.user?.id) {
            this.logger.debug(`GET /@me - Unauthorized`);
            return Unauthorized(res);
        }

        const { user, error } = await this.userService.getUserById(req.user.id);

        const response = new ResponseBuilder(res);
        if (error) {
            this.logger.warn(`GET /@me - Error`, { error });
            return response.setError(error.message).toJSON(500);
        }

        if (!user) {
            this.logger.debug(`GET /@me - Not found`);
            return response.setError('Not found').toJSON(404);
        }

        this.logger.debug(`GET /@me - Found`);
        return response.setData({ user }).toJSON(200);
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() data: CreateUserRequest, @Res() res: Response) {
        const { user, error } = await this.userService.createUser(data);

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ user }).toJSON(201);
    }

    @Delete()
    @HttpCode(204)
    async deleteUser(@Req() req: Request, @Res() res: Response) {
        if (!req?.user?.id) return Unauthorized(res);

        const { success } = await this.userService.deleteUser(req.user.id);

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete user').toJSON(500);
    }
}
