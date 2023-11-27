import { ConnectAccountRequest } from '@app/proto/account';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../src/account.service';
import { mockAccount } from './fixtures/mockAccount';

describe('AccountService', () => {
    let accountService: AccountService;
    let accountModelMock: any;

    beforeEach(async () => {
        accountModelMock = {
            findOne: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                {
                    provide: getModelToken('account'),
                    useValue: accountModelMock,
                },
            ],
        }).compile();

        accountService = module.get<AccountService>(AccountService);
    });

    describe('getAccountById', () => {
        it('should return an account when found', async () => {
            accountModelMock.findOne.mockResolvedValue(mockAccount);

            const result = await accountService.getAccountById('1', 'user1');
            expect(result).toEqual({ account: mockAccount });
        });

        it('should return an error when account not found', async () => {
            accountModelMock.findOne.mockResolvedValue(null);

            const result = await accountService.getAccountById('2', 'user2');
            expect(result).toEqual({
                error: { message: 'Not found', code: 404 },
            });
        });
    });

    describe('connectAccount', () => {
        const mockAccountData: ConnectAccountRequest = {
            uid: 'user1',
            cid: 'connection1',
            account: {
                id: '1',
            } as any,
            createMask: [],
        };

        it('should successfully connect an account', async () => {
            accountModelMock.create.mockResolvedValue(mockAccount);

            const result = await accountService.connectAccount(mockAccountData);
            expect(result).toEqual({ account: mockAccount });
        });

        it('should return an error when account creation fails', async () => {
            accountModelMock.create.mockResolvedValue(null);

            const result = await accountService.connectAccount(mockAccountData);
            expect(result).toEqual({
                error: {
                    message: 'Failed to create account',
                    info: 'Creation was falsy',
                    code: 500,
                },
            });
        });

        describe('disconnectAccount', () => {
            it('should successfully delete an account', async () => {
                accountModelMock.deleteOne.mockResolvedValue({
                    deletedCount: 1,
                });

                const result = await accountService.disconnectAccount(
                    '1',
                    'user1',
                );
                expect(result).toEqual({ success: true });
            });

            it('should return success false when account deletion fails', async () => {
                accountModelMock.deleteOne.mockResolvedValue({
                    deletedCount: 0,
                });

                const result = await accountService.disconnectAccount(
                    '2',
                    'user2',
                );
                expect(result).toEqual({ success: false });
            });
        });
    });
});
