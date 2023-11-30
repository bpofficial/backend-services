import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatusCode } from 'axios';
import * as request from 'supertest';
import { LocalAccountHttpController } from '../src/local-account.controller';
import { AccountServiceProvider } from '@app/clients';
import { mockAccount } from './fixtures/mockAccount';

describe('LocalAccountHttpController', () => {
    let app: INestApplication;
    const accountService = {
        VerifyEmail: jest.fn(),
        RequestVerification: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LocalAccountHttpController],
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
        await app.init();
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
                .expect(HttpStatusCode.Ok)
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
