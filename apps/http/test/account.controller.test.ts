import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mockAccount } from './fixtures/mockAccount';
import { AccountHttpController } from '../src/account.controller';
import { AccountServiceProvider } from '@app/clients';

describe('AccountHttpController', () => {
    const userAuthorized = jest.fn().mockReturnValue(true);

    let app: INestApplication;
    const accountService = {
        GetAccount: jest.fn(),
        GetAccountByUsername: jest.fn(),
        Update: jest.fn(),
        Connect: jest.fn(),
        Disconnect: jest.fn(),
        ValidatePassword: jest.fn(),
        VerifyEmail: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountHttpController],
            providers: [
                {
                    provide: AccountServiceProvider,
                    useValue: {
                        getService: () => accountService,
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

    describe('GET /accounts/:id', () => {
        it('should return account details', async () => {
            accountService.GetAccount.mockResolvedValue({
                account: mockAccount,
            });

            return request(app.getHttpServer())
                .get('/accounts/1')
                .expect(200)
                .expect({ status: 'success', data: { account: mockAccount } });
        });

        it('should return an error if account not found', async () => {
            accountService.GetAccount.mockResolvedValue({
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
            accountService.Connect.mockResolvedValue({ account: mockAccount });

            return request(app.getHttpServer())
                .post('/accounts')
                .send(mockAccountData)
                .expect(201)
                .expect({ status: 'success', data: { account: mockAccount } });
        });

        it('should return an error if account connection fails', async () => {
            accountService.Connect.mockResolvedValue({
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

    describe('POST /accounts/verify', () => {
        it('should return success on valid email verification', async () => {
            accountService.VerifyEmail.mockResolvedValue({
                success: true,
            });

            const data = {
                aid: mockAccount.id,
                uid: 'user1',
                token: 'valid_token',
            };
            return request(app.getHttpServer())
                .post('/accounts/verify')
                .send(data)
                .expect(200)
                .expect({ status: 'success', data: null });
        });

        it('should handle verification failure', async () => {
            accountService.VerifyEmail.mockResolvedValue({
                error: { message: 'Invalid token' },
            });

            const data = {
                aid: mockAccount.id,
                uid: 'user1',
                token: 'invalid_token',
            };

            return request(app.getHttpServer())
                .post('/accounts/verify')
                .send(data)
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Invalid token' },
                });
        });

        // Additional test cases for other scenarios like expired token, already verified account, etc.
    });
});
