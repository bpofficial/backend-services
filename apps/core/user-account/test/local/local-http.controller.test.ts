import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatusCode } from 'axios';
import * as request from 'supertest';
import { LocalAccountService } from '../../src/local/local-account.service';
import { LocalAccountHttpController } from '../../src/local/local-http.controller';
import { mockAccount } from '../fixtures/mockAccount';

describe('LocalAccountHttpController', () => {
    let app: INestApplication;
    let localAccountService: LocalAccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LocalAccountHttpController],
            providers: [
                {
                    provide: LocalAccountService,
                    useValue: {
                        verifyEmail: jest.fn(),
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        localAccountService =
            module.get<LocalAccountService>(LocalAccountService);
    });

    describe('POST /accounts/verify', () => {
        it('should return success on valid email verification', async () => {
            jest.spyOn(localAccountService, 'verifyEmail').mockResolvedValue({
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
            jest.spyOn(localAccountService, 'verifyEmail').mockResolvedValue({
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
                .expect(400)
                .expect({
                    status: 'error',
                    data: { message: 'Invalid token' },
                });
        });

        // Additional test cases for other scenarios like expired token, already verified account, etc.
    });
});
