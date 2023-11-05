import { CreateConnectionRequest } from '@app/proto/connection';
import { ErrorResponse, Response } from '@app/shared';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { ConnectionService } from './connection.service';

@Controller('connections')
export class ConnectionHttpController {
    constructor(private connectionService: ConnectionService) {}

    @Get(`/:id`)
    @HttpCode(HttpStatusCode.Ok)
    async getConnection(@Param('id') cid: string) {
        const { connection, error } =
            await this.connectionService.getConnectionById({ cid });

        if (error || !connection) {
            return new ErrorResponse({ ...error }).toErrorResponse();
        }

        return new Response({ connection }).toResponse();
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async createConnection(@Body() data: CreateConnectionRequest) {
        const connection = await this.connectionService.createConnection(data);

        if (connection.error || !connection.connection) {
            return new ErrorResponse({ ...connection.error }).toErrorResponse();
        }

        return new Response({ connection }).toResponse();
    }

    @Delete('/:id')
    @HttpCode(HttpStatusCode.NoContent)
    async deleteConnection(@Param('id') cid: string) {
        const { success } = await this.connectionService.deleteConnection({
            cid,
        });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to remove connection',
        }).toFailureResponse();
    }
}
