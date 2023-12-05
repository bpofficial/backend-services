import { OrgServiceProvider } from '@app/clients';
import { OrgService } from '@app/proto/org';
import { ResponseBuilder, Unauthorized } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('org')
export class OrgHttpController {
    private readonly logger = new Logger('OrgHttpController');
    private readonly orgService: OrgService;

    constructor(private readonly orgServiceProvider: OrgServiceProvider) {
        this.orgService = this.orgServiceProvider.getService();
    }

    @Get()
    @UseGuards(AuthGuard('session'))
    async getOrg(@Req() req: Request, @Res() res: Response) {
        const { org, error } = await this.orgService.FindOneById({
            oid: req.user.oid,
        });

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ org }).toJSON(200);
    }

    @Post()
    async createOrg(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: any,
    ) {
        if (!req.user.id) return Unauthorized(res);

        const { org, error } = await this.orgService.Create({
            ...data,
            owner: req.user.id,
        });

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ org }).toJSON(201);
    }

    @Delete()
    @UseGuards(AuthGuard('session'))
    async deleteOrg(@Req() req: Request, @Res() res: Response) {
        const { success } = await this.orgService.Delete({
            oid: req.user.oid,
        });

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete organisation').toJSON(500);
    }
}
