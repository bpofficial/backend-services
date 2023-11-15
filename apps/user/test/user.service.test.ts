import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user.service';
import { mockUser } from './fixtures/mockUser';

describe('UserService', () => {
    let userService: UserService;
    let userModelMock: any;

    beforeEach(async () => {
        userModelMock = {
            findById: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken('user'),
                    useValue: userModelMock,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    describe('getUserById', () => {
        it('should return user data if found', async () => {
            const userWithMethods = {
                ...mockUser,
                toJSON: jest.fn(() => mockUser),
            };
            userModelMock.findById.mockResolvedValue(userWithMethods);

            const result = await userService.getUserById(mockUser.id);
            expect(result.user).toEqual(mockUser);
        });

        it('should return an error if user not found', async () => {
            userModelMock.findById.mockResolvedValue(null);

            const result = await userService.getUserById('unknown');
            expect(result.error).toEqual({ message: 'Not found' });
        });

        it('should return an error on exception', async () => {
            userModelMock.findById.mockRejectedValue(
                new Error('Database error'),
            );

            const result = await userService.getUserById(mockUser.id);
            expect(result.error).toEqual({ message: 'An error occured' });
        });
    });

    describe('createUser', () => {
        it('should successfully create a user', async () => {
            const userWithMethods = {
                ...mockUser,
                toJSON: jest.fn(() => mockUser),
            };
            userModelMock.create.mockResolvedValue(userWithMethods);

            const result = await userService.createUser(mockUser);
            expect(result.user).toEqual(mockUser);
        });

        it('should return an error if creation fails', async () => {
            userModelMock.create.mockRejectedValue(
                new Error('Creation failed'),
            );

            const result = await userService.createUser(mockUser);
            expect(result.error).toEqual({ message: 'Failed to create user' });
        });
    });

    describe('deleteUser', () => {
        it('should successfully delete a user', async () => {
            userModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

            const result = await userService.deleteUser(mockUser.id);
            expect(result.success).toBeTruthy();
        });

        it('should return failure if no user is deleted', async () => {
            userModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });

            const result = await userService.deleteUser(mockUser.id);
            expect(result.success).toBeFalsy();
        });

        it('should return failure on exception', async () => {
            userModelMock.deleteOne.mockRejectedValue(
                new Error('Deletion failed'),
            );

            const result = await userService.deleteUser(mockUser.id);
            expect(result.success).toBeFalsy();
        });
    });
});
