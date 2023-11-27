import { CreateOrgRequest } from '@app/proto/org';
import { DynamicStrategyService } from '@app/shared/auth/dynamic.strategy';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrgHttpController } from '../src/http.controller';
import { OrgService } from '../src/org.service';
import { mockOrg } from './fixtures/mockOrg';

describe('OrgHttpController', () => {
    const userAuthorized = jest.fn().mockReturnValue(true);
    let app: INestApplication;
    let orgService: OrgService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrgHttpController],
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
                    provide: OrgService,
                    useValue: {
                        getOrgById: jest.fn(),
                        createOrg: jest.fn(),
                        deleteOrg: jest.fn(),
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
        orgService = module.get<OrgService>(OrgService);
    });

    afterEach(async () => {
        await app.close();
    });

    describe('getOrg', () => {
        it('should return organisation details', async () => {
            jest.spyOn(orgService, 'getOrgById').mockResolvedValue({
                org: mockOrg,
                error: null,
            });

            return request(app.getHttpServer())
                .get('/org')
                .set('user', JSON.stringify({ oid: '1' })) // Mock user object in request
                .expect(200)
                .expect({ status: 'success', data: { org: mockOrg } });
        });

        it('should return an error when organisation not found', async () => {
            jest.spyOn(orgService, 'getOrgById').mockResolvedValue({
                org: null,
                error: { message: 'Org not found' },
            });

            return request(app.getHttpServer())
                .get('/org')
                .set('user', JSON.stringify({ oid: '1' }))
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Org not found' },
                });
        });

        it('should return forbidden (guard) if user oid is missing', async () => {
            userAuthorized.mockReturnValueOnce(false);
            return request(app.getHttpServer())
                .get('/org')
                .set('user', JSON.stringify({}))
                .expect(403);
        });
    });

    describe('createOrg', () => {
        const createOrgData: CreateOrgRequest = {
            name: 'New Org',
            domain: 'neworg.com',
            owner: 'user1',
            callbackUrl: 'https://neworg.com/cb',
        };

        it('should create an organisation', async () => {
            const mockCreateResponse = { org: { id: '2', ...createOrgData } };
            jest.spyOn(orgService, 'createOrg').mockResolvedValue(
                mockCreateResponse,
            );

            return request(app.getHttpServer())
                .post('/org')
                .send(createOrgData)
                .expect(201)
                .expect({ status: 'success', data: mockCreateResponse });
        });

        it('should return an error if org creation fails', async () => {
            jest.spyOn(orgService, 'createOrg').mockResolvedValue({
                error: { message: 'Creation failed' },
            });

            return request(app.getHttpServer())
                .post('/org')
                .send(createOrgData)
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Creation failed' },
                });
        });
    });

    describe('deleteOrg', () => {
        it('should delete an organisation', async () => {
            jest.spyOn(orgService, 'deleteOrg').mockResolvedValue({
                success: true,
            });

            return request(app.getHttpServer())
                .delete('/org')
                .set('user', JSON.stringify({ oid: '1', id: 'user1' }))
                .expect(204);
        });

        it('should return an error during organisation deletion', async () => {
            jest.spyOn(orgService, 'deleteOrg').mockResolvedValue({
                success: false,
            });

            return request(app.getHttpServer())
                .delete('/org')
                .set('user', JSON.stringify({ oid: '1', id: 'user1' }))
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Failed to delete organisation' },
                });
        });

        it('should return forbidden (guard) if user oid is missing', async () => {
            userAuthorized.mockReturnValueOnce(false);
            return request(app.getHttpServer()).delete('/org').expect(403);
        });
    });
});
