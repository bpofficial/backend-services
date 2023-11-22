import { CreateConnectionRequest } from '@app/proto/connection';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { ConnectionService } from './connection.service';

@Controller('connections')
export class ConnectionHttpController {
    constructor(private connectionService: ConnectionService) {}

    @Get(`/:id`)
    @HttpCode(HttpStatusCode.Ok)
    async getConnection(@Res() res: Response, @Param('id') cid: string) {
        const { connection, error } =
            await this.connectionService.getConnectionById(cid);

        const response = new ResponseBuilder(res);

        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ connection }).toJSON(200);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async createConnection(
        @Res() res: Response,
        @Body() data: CreateConnectionRequest,
    ) {
        const { connection, error } =
            await this.connectionService.createConnection(data);

        const response = new ResponseBuilder(res);

        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ connection }).toJSON(201);
    }

    @Delete('/:id')
    @HttpCode(HttpStatusCode.NoContent)
    async deleteConnection(@Res() res: Response, @Param('id') cid: string) {
        const { success } = await this.connectionService.deleteConnection(cid);

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete connection').toJSON(500);
    }
}
