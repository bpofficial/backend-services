import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from '../src/connection.service';
import { ConnectionGrpcController } from '../src/grpc.controller';
import { mockConnection } from './fixtures/mockConnection';
import { OpaService } from '@app/shared';
import { OrgServiceProvider } from '@app/clients';

describe('ConnectionGrpcController', () => {
    let controller: ConnectionGrpcController;
    let connectionService: ConnectionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnectionGrpcController],
            providers: [
                {
                    provide: OpaService,
                    useValue: {
                        evaluatePolicy: jest.fn().mockResolvedValue(true),
                    },
                },
                {
                    provide: OrgServiceProvider,
                    useValue: {
                        getService: jest.fn().mockReturnValue({
                            FindOneById: jest.fn().mockResolvedValue({
                                id: '123',
                            }),
                        }),
                    },
                },
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

        controller = module.get<ConnectionGrpcController>(
            ConnectionGrpcController,
        );
        connectionService = module.get<ConnectionService>(ConnectionService);
    });

    describe('findConnectionById', () => {
        it('should return a connection when found', async () => {
            jest.spyOn(
                connectionService,
                'getConnectionById',
            ).mockResolvedValue({ connection: mockConnection });

            const result = await controller.findConnectionById({ cid: '1' });
            expect(result).toEqual({ connection: mockConnection });
        });

        it('should return an error when connection not found', async () => {
            jest.spyOn(
                connectionService,
                'getConnectionById',
            ).mockResolvedValue({ error: { message: 'Not found' } });

            const result = await controller.findConnectionById({ cid: '2' });
            expect(result).toEqual({ error: { message: 'Not found' } });
        });
    });

    describe('createConnection', () => {
        it('should successfully create a connection', async () => {
            const mockCreateData = {
                name: 'Test Connection',
                type: 'type',
                config: {},
            };

            const mockConnection = {
                id: '1',
                ...mockCreateData,
            };

            jest.spyOn(connectionService, 'createConnection').mockResolvedValue(
                { connection: mockConnection as any },
            );

            const result = await controller.createConnection(
                mockCreateData as any,
            );

            expect(result).toEqual({ connection: mockConnection });
        });

        it('should return an error if connection creation fails', async () => {
            jest.spyOn(connectionService, 'createConnection').mockResolvedValue(
                { error: { message: 'Creation failed' } },
            );

            const mockCreateData = {
                name: 'Test Connection',
                type: 'type',
                config: {},
            };

            const result = await controller.createConnection(
                mockCreateData as any,
            );

            expect(result).toEqual({ error: { message: 'Creation failed' } });
        });
    });

    describe('deleteConnection', () => {
        it('should successfully delete a connection', async () => {
            jest.spyOn(connectionService, 'deleteConnection').mockResolvedValue(
                { success: true },
            );

            const result = await controller.deleteConnection({ cid: '1' });
            expect(result).toEqual({ success: true });
        });

        it('should return success false when connection deletion fails', async () => {
            jest.spyOn(connectionService, 'deleteConnection').mockResolvedValue(
                { success: false },
            );

            const result = await controller.deleteConnection({ cid: '2' });
            expect(result).toEqual({ success: false });
        });
    });
});
