import { DynamicStrategyService } from '@app/shared/auth/dynamic.strategy';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mockMember } from '../../core/org-member/test/fixtures/mockMember';
import { MemberHttpController } from '../src/member.controller';
import { MemberServiceProvider } from '@app/clients';

describe('MemberHttpController', () => {
    const userAuthorized = jest.fn().mockReturnValue(true);

    let app: INestApplication;
    const memberService = {
        GetMember: jest.fn(),
        AcceptInvite: jest.fn(),
        CreateInvite: jest.fn(),
        Create: jest.fn(),
        Delete: jest.fn(),
        DeleteAll: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MemberHttpController],
            providers: [
                {
                    provide: DynamicStrategyService,
                    useValue: {
                        createStrategy: jest.fn().mockReturnValue({
                            authenticate: jest.fn().mockReturnValue(true),
                        }),
                    },
                },
                {
                    provide: MemberServiceProvider,
                    useValue: {
                        getService: () => memberService,
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        app.use((req, res, next) => {
            if (userAuthorized()) {
                req.user = {
                    oid: '1',
                    id: 'user1',
                };
            }

            next();
        });

        await app.init();
    });

    describe('GET /members/:id', () => {
        it('should return member details', async () => {
            memberService.GetMember.mockResolvedValue({
                member: mockMember,
            });

            return request(app.getHttpServer())
                .get('/members/1')
                .expect(200)
                .expect({ status: 'success', data: { member: mockMember } });
        });

        it('should return an error if member not found', async () => {
            memberService.GetMember.mockResolvedValue({
                error: { message: 'Not found' },
            });

            return request(app.getHttpServer())
                .get('/members/1')
                .expect(500)
                .expect({ status: 'error', data: { message: 'Not found' } });
        });
    });

    describe('POST /members/invite', () => {
        it('should successfully create an invitation', async () => {
            const mockInvite = { invitation: 'inviteToken' };
            memberService.CreateInvite.mockResolvedValue(mockInvite);

            return request(app.getHttpServer())
                .post('/members/invite')
                .send({ email: 'user@example.com', role: 'Member' })
                .expect(200)
                .expect({
                    status: 'success',
                    data: { invitation: 'inviteToken' },
                });
        });

        it('should return an error if invitation creation fails', async () => {
            memberService.CreateInvite.mockResolvedValue({
                error: { message: 'An unknown issue occured' },
            });

            return request(app.getHttpServer())
                .post('/members/invite')
                .send({ email: 'user@example.com', role: 'Member' })
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'An unknown issue occured' },
                });
        });
    });

    describe('POST /members/accept', () => {
        it('should successfully accept an invitation', async () => {
            memberService.AcceptInvite.mockResolvedValue({
                success: true,
            });

            return request(app.getHttpServer())
                .post('/members/accept')
                .query({ invitation: 'inviteToken' })
                .expect(204);
        });

        it('should return an error if invitation acceptance fails', async () => {
            memberService.AcceptInvite.mockResolvedValue({
                success: false,
            });

            return request(app.getHttpServer())
                .post('/members/accept')
                .query({ invitation: 'inviteToken' })
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Failed to accept invitation' },
                });
        });
    });

    describe('DELETE /members/:id', () => {
        it('should successfully delete a member', async () => {
            memberService.Delete.mockResolvedValue({
                success: true,
            });

            return request(app.getHttpServer())
                .delete('/members/1')
                .expect(204);
        });

        it('should return an error if member deletion fails', async () => {
            memberService.Delete.mockResolvedValue({
                success: false,
            });

            return request(app.getHttpServer())
                .delete('/members/1')
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Failed to delete member' },
                });
        });
    });

    afterEach(async () => {
        await app.close();
    });
});
