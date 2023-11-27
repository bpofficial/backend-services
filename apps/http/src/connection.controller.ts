import { ConnectionServiceProvider } from '@app/clients';
import {
    ConnectionService,
    CreateConnectionRequest,
} from '@app/proto/connection';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

@Controller('connections')
export class ConnectionHttpController {
    private readonly logger = new Logger('ConnectionHttpController');
    private readonly connectionService: ConnectionService;

    constructor(private connectionServiceProvider: ConnectionServiceProvider) {
        this.connectionService = this.connectionServiceProvider.getService();
    }

    @Get(`/:id`)
    @HttpCode(HttpStatusCode.Ok)
    async getConnection(@Res() res: Response, @Param('id') cid: string) {
        const { connection, error } =
            await this.connectionService.GetConnection({ cid });

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
        const connection = await this.connectionService.Create(data);

        const response = new ResponseBuilder(res);
        return response.setData({ connection }).toJSON(201);
    }

    @Delete('/:id')
    @HttpCode(HttpStatusCode.NoContent)
    async deleteConnection(@Res() res: Response, @Param('id') cid: string) {
        const { success } = await this.connectionService.Delete({ cid });

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete connection').toJSON(500);
    }
}
