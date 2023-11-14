import { HttpServer, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserHttpController } from '../src/http.controller';
import { UserService } from '../src/user.service';
import { mockUser } from './fixtures/mockUser';

describe('UserHttpController', () => {
    let app: INestApplication;
    let httpServer: HttpServer;
    let userService: UserService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserHttpController],
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

        app = moduleFixture.createNestApplication();
        app.use((req, res, next) => {
            req.user = mockUser;
            next();
        });
        await app.init();
        httpServer = app.getHttpServer();
        userService = moduleFixture.get<UserService>(UserService);
    });

    afterAll(async () => {
        await app.close();
    });

    // Tests for GET /user
    describe('getMe', () => {
        it('should return user details', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue({
                user: mockUser,
                error: null,
            });

            return request(httpServer)
                .get('/user')
                .expect(200)
                .expect({
                    status: 'success',
                    data: {
                        user: mockUser,
                    },
                });
        });

        it('should handle errors when user not found', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue({
                user: null,
                error: null,
            });

            return request(httpServer).get('/user').expect(404);
        });
    });

    // Tests for POST /user
    describe('createAccount', () => {
        it('should create a user account', async () => {
            jest.spyOn(userService, 'createUser').mockResolvedValue({
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
            jest.spyOn(userService, 'createUser').mockResolvedValue({
                user: null,
                error: { message: 'Error creating user' },
            });

            return request(httpServer)
                .post('/user')
                .send({ name: 'New User' })
                .expect(500);
        });
    });

    // Tests for DELETE /user
    describe('deleteAccount', () => {
        it('should delete a user account', async () => {
            jest.spyOn(userService, 'deleteUser').mockResolvedValue({
                success: true,
            });

            return request(httpServer).delete('/user').expect(204);
        });

        it('should handle errors during account deletion', async () => {
            jest.spyOn(userService, 'deleteUser').mockResolvedValue({
                success: false,
            });

            return request(httpServer).delete('/user').expect(500);
        });
    });
});
