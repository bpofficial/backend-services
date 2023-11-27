import { UserServiceProvider } from '@app/clients';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from '../src/member.service';
import { mockMember } from './fixtures/mockMember';

describe('MemberService', () => {
    let memberService: MemberService;
    let memberModelMock: any;
    let invitationModelMock: any;
    let userServiceMock: any;

    beforeEach(async () => {
        memberModelMock = {
            findById: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            deleteMany: jest.fn(),
        };
        invitationModelMock = {
            create: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
        };
        userServiceMock = {
            GetUser: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MemberService,
                {
                    provide: getModelToken('member'),
                    useValue: memberModelMock,
                },
                {
                    provide: getModelToken('invitation'),
                    useValue: invitationModelMock,
                },
                {
                    provide: UserServiceProvider,
                    useValue: {
                        getService: () => userServiceMock,
                    },
                },
            ],
        }).compile();

        memberService = module.get<MemberService>(MemberService);
    });

    describe('getMemberById', () => {
        it('should return member data if found', async () => {
            memberModelMock.findById.mockResolvedValue(mockMember);

            const result = await memberService.getMemberById('1', 'org1');
            expect(result).toEqual({ member: expect.anything() });
        });

        it('should return error if member not found', async () => {
            memberModelMock.findById.mockResolvedValue(null);

            const result = await memberService.getMemberById('unknown', 'org1');
            expect(result).toEqual({ error: { message: 'Not found' } });
        });
    });

    describe('createInvite', () => {
        it('should successfully create an invitation', async () => {
            const mockInviteRequest = {
                oid: 'org1',
                email: 'user@example.com',
                role: 'Member',
            };
            const mockInvite = {
                id: '1',
                invitation: 'inviteToken',
                ...mockInviteRequest,
            };

            invitationModelMock.create.mockResolvedValue(mockInvite);

            const result = await memberService.createInvite(mockInviteRequest);
            // We use the generated invitation token in the service, not the one
            // returned by the create call.
            expect(result).toEqual({ invitation: expect.any(String) });
        });

        it('should return error if invitation creation fails', async () => {
            invitationModelMock.create.mockResolvedValue(null); // Simulating creation failure

            const mockInviteRequest = {
                oid: 'org1',
                email: 'user@example.com',
                role: 'Member',
            };
            const result = await memberService.createInvite(mockInviteRequest);
            expect(result).toEqual({ error: { message: 'An error occured' } });
        });
    });

    describe('acceptInvite', () => {
        const mockAcceptInviteRequest = {
            oid: 'org1',
            uid: 'user1',
            invitation: 'inviteToken',
        };
        const mockUserResponse = {
            user: { id: 'user1', email: 'user@example.com' },
            error: null,
        };
        const mockInvitation = {
            oid: 'org1',
            uid: 'user1',
            email: 'user@example.com',
            role: 'Member',
            accepted: false,
        };

        beforeEach(() => {
            userServiceMock.GetUser.mockResolvedValue(mockUserResponse);
            invitationModelMock.findOne.mockResolvedValue(mockInvitation);
        });

        it('should successfully accept an invitation', async () => {
            const result = await memberService.acceptInvite(
                mockAcceptInviteRequest,
            );
            expect(result.success).toBeTruthy();
            expect(invitationModelMock.updateOne).toHaveBeenCalledWith(
                { oid: 'org1', invitation: 'inviteToken' },
                { accepted: true },
            );
        });

        it('should return failure if invitation is not found', async () => {
            invitationModelMock.findOne.mockResolvedValue(null);
            const result = await memberService.acceptInvite(
                mockAcceptInviteRequest,
            );
            expect(result.success).toBeFalsy();
        });

        it('should return failure if invitation is already accepted', async () => {
            invitationModelMock.findOne.mockResolvedValue({
                ...mockInvitation,
                accepted: true,
            });
            const result = await memberService.acceptInvite(
                mockAcceptInviteRequest,
            );
            expect(result.success).toBeFalsy();
        });

        it('should return failure if user is not found or there is a user error', async () => {
            userServiceMock.GetUser.mockResolvedValue({
                user: null,
                error: { message: 'User not found' },
            });
            const result = await memberService.acceptInvite(
                mockAcceptInviteRequest,
            );
            expect(result.success).toBeFalsy();
        });

        it('should return failure if email does not match', async () => {
            userServiceMock.GetUser.mockResolvedValue({
                user: { id: 'user1', email: 'different@example.com' },
                error: null,
            });

            const result = await memberService.acceptInvite(
                mockAcceptInviteRequest,
            );

            expect(result.success).toBeFalsy();
        });
    });

    describe('createMember', () => {
        const mockCreateMemberRequest = {
            oid: 'org1',
            uid: 'user1',
            role: 'Member',
        };

        it('should successfully create a member and return the member data', async () => {
            const mockMemberData = {
                id: '1',
                oid: 'org1',
                uid: 'user1',
                role: 'Member',
            };
            memberModelMock.create.mockResolvedValue(mockMemberData);

            const result = await memberService.createMember(
                mockCreateMemberRequest,
            );

            expect(result).toEqual({
                member: {
                    email: undefined,
                    invitation: expect.any(String),
                    accepted: false,
                    ...mockMemberData,
                },
            });
        });

        it('should return an error if member creation fails', async () => {
            memberModelMock.create.mockImplementation(() => {
                throw new Error('Creation failed');
            });

            const result = await memberService.createMember(
                mockCreateMemberRequest,
            );
            expect(result).toEqual({ error: { message: 'An error occured' } });
        });
    });

    describe('deleteMember', () => {
        const mockDeleteMemberRequest = { mid: '1', oid: 'org1' };

        it('should successfully delete a member and return success', async () => {
            memberModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

            const result = await memberService.deleteMember(
                mockDeleteMemberRequest.mid,
                mockDeleteMemberRequest.oid,
            );
            expect(result).toEqual({ success: true });
        });

        it('should return success false if no member is deleted', async () => {
            memberModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });

            const result = await memberService.deleteMember(
                mockDeleteMemberRequest.mid,
                mockDeleteMemberRequest.oid,
            );
            expect(result).toEqual({ success: false });
        });
    });

    describe('deleteAllMembers', () => {
        const mockDeleteAllMembersRequest = { oid: 'org1' };

        it('should successfully delete all members of an organization and return success', async () => {
            memberModelMock.deleteMany.mockResolvedValue({ deletedCount: 2 }); // Assuming 2 members were deleted

            const result = await memberService.deleteAllMembers(
                mockDeleteAllMembersRequest.oid,
            );
            expect(result).toEqual({ success: true });
        });

        it('should return success false if no members are deleted', async () => {
            memberModelMock.deleteMany.mockResolvedValue({ deletedCount: 0 }); // No members found to delete

            const result = await memberService.deleteAllMembers(
                mockDeleteAllMembersRequest.oid,
            );
            expect(result).toEqual({ success: false });
        });
    });
});
