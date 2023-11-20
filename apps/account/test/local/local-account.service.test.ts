import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../../src/account.service';
import { LocalAccountService } from '../../src/local/local-account.service';
import { mockAccount } from '../fixtures/mockAccount';

describe('LocalAccountService', () => {
    let localAccountService: LocalAccountService;
    let accountService: AccountService;
    let accountModelMock: any;

    beforeEach(async () => {
        accountModelMock = {
            updateOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocalAccountService,
                {
                    provide: AccountService,
                    useValue: {
                        getAccountById: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('account'),
                    useValue: accountModelMock,
                },
            ],
        }).compile();

        localAccountService =
            module.get<LocalAccountService>(LocalAccountService);
        accountService = module.get<AccountService>(AccountService);
    });

    describe('verifyEmail', () => {
        it('should verify email if token is valid and not expired', async () => {
            const account = {
                ...mockAccount,
                verified: false,
                verificationToken: 'valid_token',
                verificationExpiry: Date.now() + 10000, // Token not expired
            };
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account,
            });
            accountModelMock.updateOne.mockResolvedValue({});

            const result = await localAccountService.verifyEmail(
                '1',
                'user1',
                'valid_token',
            );
            expect(result).toEqual({ success: true });
        });

        it('should return error if account is already verified', async () => {
            const account = {
                ...mockAccount,
                verified: true,
            };
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account,
            });

            const result = await localAccountService.verifyEmail(
                '1',
                'user1',
                'token',
            );
            expect(result.error).toBeDefined();
        });

        it('should return error if verification token is expired', async () => {
            const account = {
                ...mockAccount,
                verified: false,
                verificationToken: 'token',
                verificationExpiry: Date.now() - 10000, // Token expired
            };
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account,
            });

            const result = await localAccountService.verifyEmail(
                '1',
                'user1',
                'token',
            );
            expect(result.error).toBeDefined();
        });

        it('should return error if verification token is invalid', async () => {
            const account = {
                ...mockAccount,
                verified: false,
                verificationToken: 'valid_token',
                verificationExpiry: Date.now() + 10000, // Token not expired
            };

            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account,
            });

            const result = await localAccountService.verifyEmail(
                '1',
                'user1',
                'invalid_token',
            );
            expect(result.error).toBeDefined();
        });
    });
});
