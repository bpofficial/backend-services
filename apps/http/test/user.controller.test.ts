import { HttpServer, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserServiceProvider } from '@app/clients';
import { UserHttpController } from '../src/user.controller';
import { mockUser } from './fixtures/mockUser';

describe('UserHttpController', () => {
    const userAuthorized = jest.fn().mockReturnValue(true);

    let app: INestApplication;
    let httpServer: HttpServer;
    const userService = {
        GetUser: jest.fn(),
        Create: jest.fn(),
        Delete: jest.fn(),
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserHttpController],
            providers: [
                {
                    provide: UserServiceProvider,
                    useValue: {
                        getService: () => userService,
                    },
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use((req, res, next) => {
            if (userAuthorized()) {
                req.user = mockUser;
            }

            next();
        });
        await app.init();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('getMe', () => {
        it('should return user details', async () => {
            userService.GetUser.mockResolvedValue({
                user: mockUser,
                error: null,
            });

            return request(httpServer)
                .get('/user/@me')
                .expect(200)
                .expect({
                    status: 'success',
                    data: {
                        user: mockUser,
                    },
                });
        });

        it('should handle errors when finding the user', async () => {
            userService.GetUser.mockResolvedValue({
                user: null,
                error: { message: 'Some random error...' },
            });

            return request(httpServer).get('/user/@me').expect(500);
        });

        it('should handle errors when user not found', async () => {
            userService.GetUser.mockResolvedValue({
                user: null,
                error: null,
            });

            return request(httpServer).get('/user/@me').expect(404);
        });

        it('should handle when the request does not have a session', async () => {
            userAuthorized.mockReturnValueOnce(false);
            return request(httpServer).get('/user/@me').expect(401);
        });
    });

    describe('createAccount', () => {
        it('should create a user account', async () => {
            userService.Create.mockResolvedValue({
                user: mockUser,
                error: null,
            });

            return request(httpServer)
                .post('/user')
                .send({ name: 'New User' })
                .expect(201)
                .expect({
                    status: 'success',
                    data: {
                        user: mockUser,
                    },
                });
        });

        it('should handle errors during account creation', async () => {
            userService.Create.mockResolvedValue({
                user: null,
                error: { message: 'Error creating user' },
            });

            return request(httpServer)
                .post('/user')
                .send({ name: 'New User' })
                .expect(500);
        });
    });

    describe('deleteAccount', () => {
        it('should delete a user account', async () => {
            userService.Delete.mockResolvedValue({
                success: true,
            });

            return request(httpServer).delete('/user').expect(204);
        });

        it('should handle errors during account deletion', async () => {
            userService.Delete.mockResolvedValue({
                success: false,
            });

            return request(httpServer).delete('/user').expect(500);
        });

        it('should handle when the request does not have a session', async () => {
            userAuthorized.mockReturnValueOnce(false);
            return request(httpServer).del('/user').expect(401);
        });
    });
});
