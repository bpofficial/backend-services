import { CreateInviteRequest } from '@app/proto/member';
import { OrgDefinedAuthGuard } from '@app/shared';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MemberService } from './member.service';

@Controller('members')
@UseGuards(OrgDefinedAuthGuard)
export class MemberHttpController {
    constructor(private readonly memberService: MemberService) {}

    @Get(`/:id`)
    async getMember(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') mid: string,
    ) {
        const { member, error } = await this.memberService.getMemberById(
            req.user.oid,
            mid,
        );

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ member }).toJSON(200);
    }

    @Post('/invite')
    async inviteMember(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: Pick<CreateInviteRequest, 'role' | 'email'>,
    ) {
        const { invitation, error } = await this.memberService.createInvite({
            oid: req.user.oid,
            role: data.role,
            email: data.email,
        });

        const response = new ResponseBuilder(res);
        if (error) return response.setError(error.message).toJSON(500);
        return response.setData({ invitation }).toJSON(200);
    }

    @Post('/accept')
    async acceptInvite(
        @Req() req: Request,
        @Res() res: Response,
        @Query('invitation') invitation: string,
    ) {
        const { success } = await this.memberService.acceptInvite({
            oid: req.user.oid,
            uid: req.user.id,
            invitation,
        });

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to accept invitation').toJSON(500);
    }

    @Delete('/:id')
    async removeMember(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') mid: string,
    ) {
        const { success } = await this.memberService.deleteMember(
            req.user.oid,
            mid,
        );

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete member').toJSON(500);
    }
}
