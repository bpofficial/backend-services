import { CreateInviteRequest } from '@app/proto/member';
import { ErrorResponse, OrgDefinedAuthGuard, Response } from '@app/shared';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('members')
@UseGuards(OrgDefinedAuthGuard)
export class MemberHttpController {
    constructor(private readonly memberService: MemberService) {}

    @Get(`/:id`)
    async getMember(@Request() request, @Param('id') mid: string) {
        const { member, error } = await this.memberService.getMemberById({
            oid: request.user.oid,
            mid,
        });

        if (error || !member) {
            return new ErrorResponse({ ...error }).toErrorResponse();
        }

        return new Response({ member }).toResponse();
    }

    @Post('/invite')
    async inviteMember(
        @Request() request,
        @Body() data: Pick<CreateInviteRequest, 'role' | 'email'>,
    ) {
        const member = await this.memberService.createInvite({
            oid: request.user.oid,
            role: data.role,
            email: data.email,
        });

        if (member.invitation) {
            return new Response({ invitation: member.invitation }).toResponse();
        }

        return new ErrorResponse({
            message: 'An unknown issue occured',
        }).toFailureResponse();
    }

    @Post('/accept')
    async acceptInvite(
        @Request() request,
        @Query('invitation') invitation: string,
    ) {
        const { success } = await this.memberService.acceptInvite({
            oid: request.user.oid,
            uid: request.user.uid,
            invitation,
        });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to accept invitation',
        }).toFailureResponse();
    }

    @Delete('/:id')
    async removeMember(@Request() request, @Param('id') mid: string) {
        const { success } = await this.memberService.deleteMember({
            oid: request.user.oid,
            mid,
        });

        if (success) return;

        return new ErrorResponse({
            message: 'Failed to remove member',
        }).toFailureResponse();
    }
}
