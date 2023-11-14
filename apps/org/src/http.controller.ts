import { OrgDefinedAuthGuard } from '@app/shared';
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
import { Request, Response } from 'express';
import { OrgService } from './org.service';

@Controller('org')
export class OrgHttpController {
    private readonly logger = new Logger('OrgHttpController');

    constructor(private readonly orgService: OrgService) {}

    @Get()
    @UseGuards(OrgDefinedAuthGuard)
    async getOrg(@Req() req: Request, @Res() res: Response) {
        if (!req.user.oid) return Unauthorized(res);

        const { org, error } = await this.orgService.getOrgById(req.user.oid);

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ org }).toJSON(200);
    }

    @Post()
    async createOrg(@Body() data: any) {
        //
    }

    @Delete()
    @UseGuards(OrgDefinedAuthGuard)
    async deleteOrg(@Req() req: Request, @Res() res: Response) {
        if (!req.user.oid) return Unauthorized(res);

        const { success } = await this.orgService.deleteOrg(
            req.user.oid,
            req.user.id,
        );

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete organisation').toJSON(500);
    }
}
