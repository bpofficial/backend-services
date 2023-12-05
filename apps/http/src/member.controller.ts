import { MemberServiceProvider } from '@app/clients';
import { CreateInviteRequest, MemberService } from '@app/proto/member';
import { ResponseBuilder } from '@app/shared/responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('members')
@UseGuards(AuthGuard('session'))
export class MemberHttpController {
    private readonly logger = new Logger('MemberHttpController');
    private readonly memberService: MemberService;

    constructor(private readonly memberServiceProvider: MemberServiceProvider) {
        this.memberService = this.memberServiceProvider.getService();
    }

    @Get(`/:id`)
    async getMember(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') mid: string,
    ) {
        const { member, error } = await this.memberService.GetMember({
            oid: req.user.oid,
            mid,
        });

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ member }).toJSON(200);
    }

    @Post('/invite')
    async inviteMember(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: Pick<CreateInviteRequest, 'role' | 'email'>,
    ) {
        const { invitation, error } = await this.memberService.CreateInvite({
            oid: req.user.oid,
            role: data.role,
            email: data.email,
        });

        const response = new ResponseBuilder(res);
        if (error)
            return response.setError(error.message).toJSON(error.code || 500);

        return response.setData({ invitation }).toJSON(200);
    }

    @Post('/accept')
    async acceptInvite(
        @Req() req: Request,
        @Res() res: Response,
        @Query('invitation') invitation: string,
    ) {
        const { success } = await this.memberService.AcceptInvite({
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
        const { success } = await this.memberService.Delete({
            oid: req.user.oid,
            mid,
        });

        const response = new ResponseBuilder(res);
        if (success) return response.setData(null).toJSON(204);
        return response.setError('Failed to delete member').toJSON(500);
    }
}
