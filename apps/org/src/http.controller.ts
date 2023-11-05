import { OrgDefinedAuthGuard } from '@app/shared';
import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';

@Controller('org')
export class OrgHttpController {
    @Get()
    @UseGuards(OrgDefinedAuthGuard)
    async getOrg(@Request() request) {
        //
    }

    @Post()
    async createOrg(@Body() data: any) {
        //
    }

    @Delete()
    @UseGuards(OrgDefinedAuthGuard)
    async deleteOrg() {
        //
    }
}
