import { ConnectAccountRequest } from '@app/proto/account';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../src/account.service';
import { AccountGrpcController } from '../src/grpc.controller';
import { mockAccount } from './fixtures/mockAccount';

describe('AccountGrpcController', () => {
    let controller: AccountGrpcController;
    let accountService: AccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountGrpcController],
            providers: [
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

        controller = module.get<AccountGrpcController>(AccountGrpcController);
        accountService = module.get<AccountService>(AccountService);
    });

    describe('findAccountById', () => {
        it('should return an account when found', async () => {
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                account: mockAccount,
            });

            const result = await controller.findAccountById({
                aid: '1',
                uid: 'user2',
            });
            expect(result).toEqual({ account: mockAccount });
        });

        it('should handle account not found', async () => {
            jest.spyOn(accountService, 'getAccountById').mockResolvedValue({
                error: { message: 'Not found' },
            });

            const result = await controller.findAccountById({
                aid: '2',
                uid: 'user2',
            });
            expect(result).toEqual({ error: { message: 'Not found' } });
        });
    });

    describe('createAccount', () => {
        const connectReq: ConnectAccountRequest = {
            uid: 'user1',
            cid: 'connection1',
            account: {
                id: '1',
            } as any,
            createMask: [],
        };

        it('should successfully create an account', async () => {
            jest.spyOn(accountService, 'connectAccount').mockResolvedValue({
                account: mockAccount,
            });

            const result = await controller.createAccount(connectReq);
            expect(result).toEqual({ account: mockAccount });
        });

        it('should handle failure in account creation', async () => {
            jest.spyOn(accountService, 'connectAccount').mockResolvedValue({
                error: { message: 'Creation failed' },
            });

            const result = await controller.createAccount(connectReq);
            expect(result).toEqual({ error: { message: 'Creation failed' } });
        });
    });

    describe('deleteAccount', () => {
        it('should successfully delete an account', async () => {
            jest.spyOn(accountService, 'disconnectAccount').mockResolvedValue({
                success: true,
            });

            const result = await controller.deleteAccount({
                aid: '1',
                uid: 'user1',
            });
            expect(result).toEqual({ success: true });
        });

        it('should handle failure in account deletion', async () => {
            jest.spyOn(accountService, 'disconnectAccount').mockResolvedValue({
                success: false,
            });

            const result = await controller.deleteAccount({
                aid: '1',
                uid: 'user2',
            });
            expect(result).toEqual({ success: false });
        });
    });
});
