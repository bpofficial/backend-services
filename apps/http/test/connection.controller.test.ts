import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatusCode } from 'axios';
import * as request from 'supertest';
import { ConnectionHttpController } from '../src/connection.controller';
import { ConnectionServiceProvider } from '@app/clients';
import { ConnectionService } from '@app/proto/connection';
import { mockConnection } from './fixtures/mockConnection';

describe('ConnectionHttpController', () => {
    let app: INestApplication;
    const connectionService = {
        GetConnection: jest.fn(),
        Create: jest.fn(),
        Update: jest.fn(),
        Delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnectionHttpController],
            providers: [
                {
                    provide: ConnectionServiceProvider,
                    useValue: {
                        getService: () => connectionService,
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    describe('GET /connections/:id', () => {
        it('should return connection details', async () => {
            connectionService.GetConnection.mockResolvedValueOnce({
                connection: mockConnection,
            });

            return request(app.getHttpServer())
                .get('/connections/1')
                .expect(HttpStatusCode.Ok)
                .expect({
                    status: 'success',
                    data: { connection: mockConnection },
                });
        });

        it('should return an error if connection not found', async () => {
            connectionService.GetConnection.mockResolvedValueOnce({
                error: { message: 'Not found', code: 404 },
            });

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

            connectionService.Create.mockResolvedValueOnce({
                connection: mockConnection,
            });

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
            connectionService.Create.mockResolvedValueOnce({
                error: { message: 'Creation failed', code: 500 },
            });

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
            connectionService.Delete.mockResolvedValueOnce({ success: true });

            return request(app.getHttpServer())
                .delete('/connections/1')
                .expect(HttpStatusCode.NoContent);
        });

        it('should return an error if connection deletion fails', async () => {
            connectionService.Delete.mockResolvedValueOnce({ success: false });

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
