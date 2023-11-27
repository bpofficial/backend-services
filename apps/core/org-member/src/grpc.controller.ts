import {
    AcceptInviteRequest,
    AcceptInviteResponse,
    CreateInviteRequest,
    CreateInviteResponse,
    CreateMemberRequest,
    DeleteAllMembersRequest,
    DeleteAllMembersResponse,
    DeleteMemberRequest,
    DeleteMemberResponse,
    GetMemberRequest,
    MemberResponse,
} from '@app/proto/member';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MemberService } from './member.service';

@Controller()
export class MemberGrpcController {
    private readonly logger = new Logger('MemberController');

    constructor(private readonly memberService: MemberService) {}

    @GrpcMethod('MemberService', 'GetMember')
    async findMemberById(data: GetMemberRequest): Promise<MemberResponse> {
        this.logger.debug(`findMemberById: mid=${data.mid}, oid=${data.oid}`);
        return this.memberService.getMemberById(data.mid, data.oid);
    }

    @GrpcMethod('MemberService', 'CreateInvite')
    async inviteMember(
        data: CreateInviteRequest,
    ): Promise<CreateInviteResponse> {
        this.logger.debug(
            `inviteMember: oid=${data.oid}, email=${data.email}, role=${data.role}`,
        );
        return this.memberService.createInvite(data);
    }

    @GrpcMethod('MemberService', 'AcceptInvite')
    async acceptInvite(
        data: AcceptInviteRequest,
    ): Promise<AcceptInviteResponse> {
        this.logger.debug(`acceptInvite: oid=${data.oid}, uid=${data.uid}`);
        return this.memberService.acceptInvite(data);
    }

    @GrpcMethod('MemberService', 'Create')
    async createMember(data: CreateMemberRequest): Promise<MemberResponse> {
        this.logger.debug(
            `createMember: oid=${data.oid}, uid=${data.uid}, role=${data.role}`,
        );
        return this.memberService.createMember(data);
    }

    @GrpcMethod('MemberService', 'Delete')
    async deleteMember(
        data: DeleteMemberRequest,
    ): Promise<DeleteMemberResponse> {
        this.logger.debug(`deleteMember: mid=${data.mid}, oid=${data.oid}`);
        return this.memberService.deleteMember(data.mid, data.oid);
    }

    @GrpcMethod('MemberService', 'DeleteAll')
    async deleteAllMembers(
        data: DeleteAllMembersRequest,
    ): Promise<DeleteAllMembersResponse> {
        this.logger.debug(`deleteAllMembers: oid=${data.oid}`);
        return this.memberService.deleteAllMembers(data.oid);
    }
}
