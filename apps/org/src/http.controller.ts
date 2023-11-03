import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('org')
export class OrgHttpController {
    @Get()
    async getOrg(@Param('id') memberId: string) {
        //
    }

    @Post()
    async createOrg(@Body() data: any) {
        //
    }

    @Delete()
    async deleteOrg() {
        //
    }
}
