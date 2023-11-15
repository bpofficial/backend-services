import { Test, TestingModule } from '@nestjs/testing';
import { UserGrpcController } from '../src/grpc.controller';
import { UserService } from '../src/user.service';
import { mockUser } from './fixtures/mockUser';

describe('UserGrpcController', () => {
    let controller: UserGrpcController;
    let userService: UserService;

    const mockUserResponse = { user: mockUser };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserGrpcController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn(),
                        createUser: jest.fn(),
                        deleteUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UserGrpcController>(UserGrpcController);
        userService = module.get<UserService>(UserService);
    });

    describe('findUserById', () => {
        it('should return user data if found', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue(
                mockUserResponse,
            );

            const result = await controller.findUserById({ uid: '1' });
            expect(result).toEqual(mockUserResponse);
        });

        it('should return error if user not found', async () => {
            const mockErrorResponse = { error: { message: 'Not found' } };
            jest.spyOn(userService, 'getUserById').mockResolvedValue(
                mockErrorResponse,
            );

            const result = await controller.findUserById({ uid: 'unknown' });
            expect(result).toEqual(mockErrorResponse);
        });
    });

    describe('createUser', () => {
        it('should create a user and return user data', async () => {
            const mockUserRequest = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            jest.spyOn(userService, 'createUser').mockResolvedValue(
                mockUserResponse,
            );

            const result = await controller.createUser(mockUserRequest);
            expect(result).toEqual(mockUserResponse);
        });

        it('should return error if user creation fails', async () => {
            const mockErrorResponse = {
                error: { message: 'Failed to create user' },
            };
            jest.spyOn(userService, 'createUser').mockResolvedValue(
                mockErrorResponse,
            );

            const result = await controller.createUser({
                name: 'Jane Doe',
                email: 'jane@example.com',
            });
            expect(result).toEqual(mockErrorResponse);
        });
    });

    // Test for deleteUser
    describe('deleteUser', () => {
        it('should delete a user and return success', async () => {
            const mockDeleteResponse = { success: true };
            jest.spyOn(userService, 'deleteUser').mockResolvedValue(
                mockDeleteResponse,
            );

            const result = await controller.deleteUser({ uid: '1' });
            expect(result).toEqual(mockDeleteResponse);
        });

        it('should return failure if user deletion fails', async () => {
            const mockFailureResponse = { success: false };
            jest.spyOn(userService, 'deleteUser').mockResolvedValue(
                mockFailureResponse,
            );

            const result = await controller.deleteUser({ uid: '1' });
            expect(result).toEqual(mockFailureResponse);
        });
    });
});
