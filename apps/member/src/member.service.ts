import { UserServiceProvider } from '@app/clients';
import {
    AcceptInviteRequest,
    AcceptInviteResponse,
    CreateInviteRequest,
    CreateInviteResponse,
    CreateMemberRequest,
    DeleteAllMembersResponse,
    DeleteMemberResponse,
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

    async getMemberById(mid: string, oid: string): Promise<MemberResponse> {
        try {
            this.logger.debug(`getMemberById: mid=${mid}, oid=${oid}`);
            const result = await this.model.findById(oid);

            if (result) {
                return { member: Member.fromJSON(result) };
            } else {
                this.logger.warn(
                    `getMemberById: not found, oid=${oid}, mid=${mid}`,
                );
                return { error: { message: 'Not found' } };
            }
        } catch (error) {
            this.logger.error(
                `getMemberById: failed to get member, oid=${oid}, mid=${mid}`,
                {
                    error: JSON.stringify(error),
                },
            );
        }

        return { error: { message: 'An error occured' } };
    }

    async createInvite(
        req: CreateInviteRequest,
    ): Promise<CreateInviteResponse> {
        try {
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
        } catch (error) {
            this.logger.error(`createInvite: failed to create invitation`, {
                error: JSON.stringify(error),
                invite: req,
            });
        }

        return { error: { message: 'An error occured' } };
    }

    async acceptInvite(
        req: AcceptInviteRequest,
    ): Promise<AcceptInviteResponse> {
        try {
            this.logger.debug(`acceptInvite: oid=${req.oid}, uid=${req.uid}`);

            const invitation = await this.invitationModel.findOne({
                oid: req.oid,
                invitation: req.invitation,
            });

            if (!invitation) {
                this.logger.debug(
                    `acceptInvite: invite does not exist, oid=${req.oid}, uid=${req.uid}`,
                );
                return { success: false };
            }

            if (invitation.accepted) {
                this.logger.debug(
                    `acceptInvite: invite already accepted, oid=${req.oid}, uid=${req.uid}`,
                );
                return { success: false };
            }

            const userService = this.userServiceProvider.getService();
            const { user, error } = await userService.GetUser({ uid: req.uid });

            if (!user.id || error) {
                this.logger.debug(
                    `acceptInvite: failed to get user, uid=${req.uid}`,
                    {
                        error,
                    },
                );
                return { success: false };
            }

            if (invitation.email && invitation.email !== user.email) {
                this.logger.debug(
                    `acceptInvite: invited email does not matched authenticated user email, uid=${req.uid}`,
                );
                return { success: false };
            }

            if (req.uid && user.id && req.uid === user.id) {
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
        } catch (error) {
            this.logger.error(`acceptInvite: failed to invite member`, {
                error: JSON.stringify(error),
                invite: req,
            });
        }

        return { success: false };
    }

    async createMember(req: CreateMemberRequest): Promise<MemberResponse> {
        try {
            const result = await this.model.create({
                oid: req.oid,
                uid: req.uid,
                role: req.role,
            });

            this.logger.debug(`createMember: created, id=${result.id}`);
            return { member: Member.fromJSON(result) };
        } catch (error) {
            this.logger.error(`createMember: failed to create member`, {
                error: JSON.stringify(error),
                member: req,
            });
        }

        return { error: { message: 'An error occured' } };
    }

    async deleteMember(
        mid: string,
        oid: string,
    ): Promise<DeleteMemberResponse> {
        try {
            this.logger.debug(`deleteMember: mid=${mid}, oid=${oid}`);
            const result = await this.model.deleteOne({
                _id: mid,
                oid: oid,
            });

            if (result.deletedCount) {
                this.logger.debug(
                    `deleteMember: deleted, mid=${mid}, oid=${oid}`,
                );
                return { success: true };
            }
        } catch (error) {
            this.logger.error(
                `deleteMember: failed to delete member, mid=${mid} oid=${oid}`,
                {
                    error: JSON.stringify(error),
                },
            );
        }

        this.logger.debug(`deleteMember: none deleted, mid=${mid}, oid=${oid}`);
        return { success: false };
    }

    async deleteAllMembers(oid: string): Promise<DeleteAllMembersResponse> {
        try {
            this.logger.debug(`deleteAllMembers: oid=${oid}`);
            const result = await this.model.deleteMany({
                oid,
            });

            if (result.deletedCount) {
                this.logger.debug(
                    `deleteAllMembers: deleted, oid=${oid}, count=${result.deletedCount}`,
                );
                return { success: true };
            }
        } catch (error) {
            this.logger.error(
                `deleteAllMembers: failed to delete all members, oid=${oid}`,
                { error: JSON.stringify(error) },
            );
        }

        this.logger.debug(`deleteAllMembers: none deleted, oid=${oid}`);
        return { success: false };
    }
}
