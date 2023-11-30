import { AccountServiceProvider } from '@app/clients';
import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsernamePasswordAuthorizeService } from '../../src/services/username-password.service';

jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    sign: jest.fn().mockReturnValue('token'),
}));

describe.skip('UsernamePasswordAuthorizeService', () => {
    let usernamePasswordAuthorizeService: UsernamePasswordAuthorizeService;
    let tokenModelMock: any;
    let accountServiceProviderMock: any;

    beforeEach(async () => {
        tokenModelMock = {
            startSession: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
        };
        accountServiceProviderMock = {
            getService: jest.fn().mockReturnValue({
                ValidatePassword: jest.fn(),
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsernamePasswordAuthorizeService,
                {
                    provide: getModelToken('token'),
                    useValue: tokenModelMock,
                },
                {
                    provide: AccountServiceProvider,
                    useValue: accountServiceProviderMock,
                },
            ],
        }).compile();

        usernamePasswordAuthorizeService =
            module.get<UsernamePasswordAuthorizeService>(
                UsernamePasswordAuthorizeService,
            );
    });

    describe('authorize', () => {
        it('should successfully authorize and return access token', async () => {
            const mockRequest = {
                url: 'http://example.com?grant_type=password&username=user&password=pass',
            };
            const mockConnection = {
                id: 'cid',
                token: {
                    expiry: 3600,
                    audience: 'aud',
                    issuer: 'iss',
                    secret: 'secret',
                    refresh: true,
                    refreshExpiry: 7200,
                },
            };
            const mockAccount = { id: 'aid', name: 'Test User' };
            accountServiceProviderMock
                .getService()
                .ValidatePassword.mockResolvedValue({ account: mockAccount });

            const result = await usernamePasswordAuthorizeService.authorize(
                mockRequest as any,
                mockConnection as any,
            );

            expect(result).toEqual(
                expect.objectContaining({
                    access_token: 'token',
                    token_type: 'Bearer',
                    expires_in: 3600,
                    scope: 'basic',
                }),
            );
        });

        it('should throw BadRequestException for unsupported grant type', async () => {
            const mockRequest = {
                url: 'http://example.com?grant_type=invalid',
            };
            const mockConnection = { id: 'cid', token: {} } as any;

            await expect(
                usernamePasswordAuthorizeService.authorize(
                    mockRequest as any,
                    mockConnection,
                ),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('createAccessToken', () => {
        it('should create and return access and refresh tokens', async () => {
            const mockAccount = { id: 'aid' } as any;
            const mockConnection = {
                id: 'cid',
                token: {
                    expiry: 3600,
                    audience: 'aud',
                    issuer: 'iss',
                    secret: 'secret',
                    refresh: true,
                    refreshExpiry: 7200,
                },
            } as any;

            tokenModelMock.startSession.mockReturnValue({
                startTransaction: jest.fn(),
                endSession: jest.fn(),
            });

            const result =
                await usernamePasswordAuthorizeService.createAccessToken(
                    mockAccount,
                    mockConnection,
                );

            expect(result).toEqual(
                expect.objectContaining({
                    access_token: 'token',
                    refresh_token: 'token',
                }),
            );
            expect(tokenModelMock.create).toHaveBeenCalled();
        });

        // Additional test cases for scenarios like token creation without refresh token, etc.
    });

    describe('revokeToken', () => {
        it('should mark a token as revoked', async () => {
            await usernamePasswordAuthorizeService.revokeToken('aid', 'jti');

            expect(tokenModelMock.updateOne).toHaveBeenCalledWith(
                { aid: 'aid', jti: 'jti' },
                { revoked: true },
            );
        });
    });
});
