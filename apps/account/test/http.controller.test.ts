import { DynamicStrategyService } from '@app/shared/auth/dynamic.strategy';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AccountService } from '../src/account.service';
import { AccountHttpController } from '../src/http.controller';
import { mockAccount } from './fixtures/mockAccount';

describe('AccountHttpController', () => {
    const userAuthorized = jest.fn().mockReturnValue(true);

    let app: INestApplication;
    let accountService: AccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountHttpController],
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
                    provide: AccountService,
                    useValue: {
                        getAccountById: jest.fn(),
                        connectAccount: jest.fn(),
                        disconnectAccount: jest.fn(),
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
        accountService = module.get<AccountService>(AccountService);
    });

    describe('GET /accounts/:id', () => {
        it('should return account details', async () => {
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account: mockAccount,
            });

            return request(app.getHttpServer())
                .get('/accounts/1')
                .expect(200)
                .expect({ status: 'success', data: { account: mockAccount } });
        });

        it('should return an error if account not found', async () => {
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                error: { message: 'Not found' },
            });

            return request(app.getHttpServer())
                .get('/accounts/1')
                .expect(500)
                .expect({ status: 'error', data: { message: 'Not found' } });
        });
    });

    describe('POST /accounts', () => {
        it('should successfully connect an account', async () => {
            const mockAccountData = { uid: 'user1', ...mockAccount };
            jest.spyOn(accountService, 'connectAccount').mockResolvedValue({
                account: mockAccount,
            });

            return request(app.getHttpServer())
                .post('/accounts')
                .send(mockAccountData)
                .expect(201)
                .expect({ status: 'success', data: { account: mockAccount } });
        });

        it('should return an error if account connection fails', async () => {
            jest.spyOn(accountService, 'connectAccount').mockResolvedValue({
                error: { message: 'Connection failed' },
            });

            return request(app.getHttpServer())
                .post('/accounts')
                .send({ uid: 'user1' })
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Connection failed' },
                });
        });
    });
});
