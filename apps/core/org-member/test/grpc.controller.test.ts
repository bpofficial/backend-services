import { Test, TestingModule } from '@nestjs/testing';
import { MemberGrpcController } from '../src/grpc.controller';
import { MemberService } from '../src/member.service';
import { mockMember } from './fixtures/mockMember';

describe('MemberGrpcController', () => {
    let controller: MemberGrpcController;
    let memberService: MemberService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MemberGrpcController],
            providers: [
                {
                    provide: MemberService,
                    useValue: {
                        getMemberById: jest.fn(),
                        createInvite: jest.fn(),
                        acceptInvite: jest.fn(),
                        createMember: jest.fn(),
                        deleteMember: jest.fn(),
                        deleteAllMembers: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<MemberGrpcController>(MemberGrpcController);
        memberService = module.get<MemberService>(MemberService);
    });

    describe('findMemberById', () => {
        it('should return a member', async () => {
            jest.spyOn(memberService, 'getMemberById').mockResolvedValue({
                member: mockMember,
            });

            const result = await controller.findMemberById({
                mid: '1',
                oid: 'org1',
            });
            expect(result).toEqual({ member: mockMember });
        });

        it('should handle member not found', async () => {
            jest.spyOn(memberService, 'getMemberById').mockResolvedValue({
                error: { message: 'Not found' },
            });

            const result = await controller.findMemberById({
                mid: '2',
                oid: 'org1',
            });
            expect(result).toEqual({ error: { message: 'Not found' } });
        });
    });

    describe('inviteMember', () => {
        it('should create an invite', async () => {
            const mockInviteData = { invitation: 'inviteToken' };
            jest.spyOn(memberService, 'createInvite').mockResolvedValue(
                mockInviteData,
            );

            const result = await controller.inviteMember({
                oid: 'org1',
                email: 'user@example.com',
                role: 'Member',
            });
            expect(result).toEqual(mockInviteData);
        });

        it('should handle failure in creating invite', async () => {
            jest.spyOn(memberService, 'createInvite').mockResolvedValue({
                error: { message: 'Creation failed' },
            });

            const result = await controller.inviteMember({
                oid: 'org1',
                email: 'user@example.com',
                role: 'Member',
            });
            expect(result).toEqual({ error: { message: 'Creation failed' } });
        });
    });

    describe('acceptInvite', () => {
        it('should successfully accept an invite', async () => {
            jest.spyOn(memberService, 'acceptInvite').mockResolvedValue({
                success: true,
            });

            const result = await controller.acceptInvite({
                oid: 'org1',
                uid: 'user1',
                invitation: 'inviteToken',
            });
            expect(result).toEqual({ success: true });
        });

        it('should handle failure in accepting invite', async () => {
            jest.spyOn(memberService, 'acceptInvite').mockResolvedValue({
                success: false,
            });

            const result = await controller.acceptInvite({
                oid: 'org1',
                uid: 'user1',
                invitation: 'inviteToken',
            });
            expect(result).toEqual({ success: false });
        });
    });

    describe('createMember', () => {
        it('should create a member', async () => {
            jest.spyOn(memberService, 'createMember').mockResolvedValue({
                member: { ...mockMember, accepted: false },
            });

            const result = await controller.createMember({
                oid: 'org1',
                uid: 'user1',
                role: 'Member',
            });

            expect(result).toEqual({
                member: {
                    ...mockMember,
                    invitation: expect.any(String),
                    accepted: false,
                },
            });
        });

        it('should handle failure in creating member', async () => {
            jest.spyOn(memberService, 'createMember').mockResolvedValue({
                error: { message: 'Creation failed' },
            });

            const result = await controller.createMember({
                oid: 'org1',
                uid: 'user1',
                role: 'Member',
            });
            expect(result).toEqual({ error: { message: 'Creation failed' } });
        });
    });

    describe('deleteMember', () => {
        it('should delete a member', async () => {
            jest.spyOn(memberService, 'deleteMember').mockResolvedValue({
                success: true,
            });

            const result = await controller.deleteMember({
                mid: '1',
                oid: 'org1',
            });
            expect(result).toEqual({ success: true });
        });

        it('should handle failure in deleting member', async () => {
            jest.spyOn(memberService, 'deleteMember').mockResolvedValue({
                success: false,
            });

            const result = await controller.deleteMember({
                mid: '2',
                oid: 'org1',
            });
            expect(result).toEqual({ success: false });
        });
    });

    describe('deleteAllMembers', () => {
        it('should delete all members', async () => {
            jest.spyOn(memberService, 'deleteAllMembers').mockResolvedValue({
                success: true,
            });

            const result = await controller.deleteAllMembers({ oid: 'org1' });
            expect(result).toEqual({ success: true });
        });

        it('should handle failure in deleting all members', async () => {
            jest.spyOn(memberService, 'deleteAllMembers').mockResolvedValue({
                success: false,
            });

            const result = await controller.deleteAllMembers({ oid: 'org1' });
            expect(result).toEqual({ success: false });
        });
    });
});
