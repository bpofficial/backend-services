import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatusCode } from 'axios';
import * as request from 'supertest';
import { ConnectionService } from '../src/connection.service';
import { ConnectionHttpController } from '../src/http.controller';
import { mockConnection } from './fixtures/mockConnection';

describe('ConnectionHttpController', () => {
    let app: INestApplication;
    let connectionService: ConnectionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnectionHttpController],
            providers: [
                {
                    provide: ConnectionService,
                    useValue: {
                        getConnectionById: jest.fn(),
                        createConnection: jest.fn(),
                        deleteConnection: jest.fn(),
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        connectionService = module.get<ConnectionService>(ConnectionService);
    });

    describe('GET /connections/:id', () => {
        it('should return connection details', async () => {
            jest.spyOn(
                connectionService,
                'getConnectionById',
            ).mockResolvedValue({ connection: mockConnection });

            return request(app.getHttpServer())
                .get('/connections/1')
                .expect(HttpStatusCode.Ok)
                .expect({
                    status: 'success',
                    data: { connection: mockConnection },
                });
        });

        it('should return an error if connection not found', async () => {
            jest.spyOn(
                connectionService,
                'getConnectionById',
            ).mockResolvedValue({ error: { message: 'Not found', code: 404 } });

            return request(app.getHttpServer())
                .get('/connections/1')
                .expect(404)
                .expect({ status: 'error', data: { message: 'Not found' } });
        });
    });

    describe('POST /connections', () => {
        it('should successfully create a connection', async () => {
            const mockCreateData = {
                name: 'New Connection',
                type: 'type',
                config: {},
            };

            const mockConnection: any = { id: '1', ...mockCreateData };

            jest.spyOn(connectionService, 'createConnection').mockResolvedValue(
                { connection: mockConnection },
            );

            return request(app.getHttpServer())
                .post('/connections')
                .send(mockCreateData)
                .expect(HttpStatusCode.Created)
                .expect({
                    status: 'success',
                    data: { connection: mockConnection },
                });
        });

        it('should return an error if connection creation fails', async () => {
            jest.spyOn(connectionService, 'createConnection').mockResolvedValue(
                { error: { message: 'Creation failed', code: 500 } },
            );

            const mockCreateData = {
                name: 'New Connection',
                type: 'type',
                config: {},
            };
            return request(app.getHttpServer())
                .post('/connections')
                .send(mockCreateData)
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Creation failed' },
                });
        });
    });

    describe('DELETE /connections/:id', () => {
        it('should successfully delete a connection', async () => {
            jest.spyOn(connectionService, 'deleteConnection').mockResolvedValue(
                { success: true },
            );

            return request(app.getHttpServer())
                .delete('/connections/1')
                .expect(HttpStatusCode.NoContent);
        });

        it('should return an error if connection deletion fails', async () => {
            jest.spyOn(connectionService, 'deleteConnection').mockResolvedValue(
                { success: false },
            );

            return request(app.getHttpServer())
                .delete('/connections/1')
                .expect(500)
                .expect({
                    status: 'error',
                    data: { message: 'Failed to delete connection' },
                });
        });
    });
});
