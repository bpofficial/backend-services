import { UserServiceProvider } from '@app/clients';
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
    Member,
    MemberResponse,
} from '@app/proto/member';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberInvitation } from './invitation.model';

@Injectable()
export class MemberService {
    private readonly logger = new Logger('MemberService');

    constructor(
        @InjectModel('member') private model: Model<Member>,
        @InjectModel('invitation')
        private invitationModel: Model<MemberInvitation>,
        private userServiceProvider: UserServiceProvider,
    ) {}

    async getMemberById(req: GetMemberRequest): Promise<MemberResponse> {
        this.logger.debug(`getMemberById: mid=${req.mid}, oid=${req.oid}`);
        const result = await this.model.findById(req.oid);

        if (result) {
            return { member: Member.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(
                `getMemberById: not found, oid=${req.oid}, mid=${req.mid}`,
            );
            return { error: { message: 'Not found' } };
        }
    }

    async createInvite(
        req: CreateInviteRequest,
    ): Promise<CreateInviteResponse> {
        this.logger.debug(
            `createInvite: oid=${req.oid}, email=${req.email}, role=${req.role}`,
        );

        const invitation = '';

        const result = await this.invitationModel.create({
            oid: req.oid,
            email: req.email,
            role: req.role,
            invitation,
        });

        this.logger.debug(`createInvite: created, id=${result.id}`);
        return { invitation };
    }

    async acceptInvite(
        req: AcceptInviteRequest,
    ): Promise<AcceptInviteResponse> {
        this.logger.debug(`acceptInvite: oid=${req.oid}, uid=${req.uid}`);

        const invitation = await this.invitationModel.findOne({
            oid: req.oid,
            invitation: req.invitation,
        });

        if (!invitation || invitation.accepted) {
            return { success: false };
        }

        const userService = this.userServiceProvider.getService();
        const user = await userService.GetUser({ uid: req.uid });

        if (!user.user.id || user.error) {
            return { success: false };
        }

        if (
            invitation.email &&
            !invitation.uid &&
            invitation.email !== user.user.email
        ) {
            return { success: false };
        }

        if (req.uid && user.user.id && req.uid === user.user.id) {
            await this.createMember({
                oid: req.oid,
                uid: req.uid,
                role: invitation.role,
            });

            await this.invitationModel.updateOne(
                {
                    oid: req.oid,
                    invitation: req.invitation,
                },
                {
                    accepted: true,
                },
            );

            return { success: true };
        }

        return { success: false };
    }

    async createMember(req: CreateMemberRequest): Promise<Member> {
        const result = await this.model.create({
            oid: req.oid,
            uid: req.uid,
            role: req.role,
        });

        this.logger.debug(`createMember: created, id=${result.id}`);
        return Member.fromJSON(result.toJSON());
    }

    async deleteMember(
        req: DeleteMemberRequest,
    ): Promise<DeleteMemberResponse> {
        this.logger.debug(`deleteMember: mid=${req.mid}, oid=${req.oid}`);
        const result = await this.model.deleteOne({
            _id: req.mid,
            oid: req.oid,
        });

        if (result.deletedCount) {
            this.logger.debug(
                `deleteMember: deleted, mid=${req.mid}, oid=${req.oid}`,
            );
            return DeleteMemberResponse.create({ success: true });
        }

        this.logger.warn(
            `deleteMember: none deleted, mid=${req.mid}, oid=${req.oid}`,
        );
        return DeleteMemberResponse.create({ success: true });
    }

    async deleteAllMembers(
        req: DeleteAllMembersRequest,
    ): Promise<DeleteAllMembersResponse> {
        this.logger.debug(`deleteAllMembers: oid=${req.oid}`);
        const result = await this.model.deleteMany({
            oid: req.oid,
        });

        if (result.deletedCount) {
            this.logger.debug(
                `deleteAllMembers: deleted, oid=${req.oid}, count=${result.deletedCount}`,
            );
            return DeleteMemberResponse.create({ success: true });
        }

        this.logger.warn(`deleteAllMembers: none deleted, oid=${req.oid}`);
        return DeleteMemberResponse.create({ success: true });
    }
}
