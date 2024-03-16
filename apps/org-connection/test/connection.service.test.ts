import { ConnectionType } from '@app/proto/connection';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from '../src/connection.service';
import { mockConnection } from './fixtures/mockConnection';

describe('ConnectionService', () => {
    let connectionService: ConnectionService;
    let connectionModelMock: any;

    beforeEach(async () => {
        connectionModelMock = {
            findById: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConnectionService,
                {
                    provide: getModelToken('connection'),
                    useValue: connectionModelMock,
                },
            ],
        }).compile();

        connectionService = module.get<ConnectionService>(ConnectionService);
    });

    describe('getConnectionById', () => {
        it('should return a connection when found', async () => {
            connectionModelMock.findById.mockResolvedValue(mockConnection);

            const result = await connectionService.getConnectionById('1');
            expect(result).toEqual({ connection: mockConnection });
        });

        it('should return an error when connection not found', async () => {
            connectionModelMock.findById.mockResolvedValue(null);

            const result = await connectionService.getConnectionById('2');
            expect(result).toEqual({
                error: { message: 'Not found', code: 404 },
            });
        });
    });

    describe('createConnection', () => {
        it('should successfully create a connection', async () => {
            const mockCreateData = {
                oid: '1',
                name: 'Test Connection',
                key: 'key',
                type: ConnectionType.OIDC,
                config: {},
            };

            const mockCreateResult = {
                id: '1',
                ...mockCreateData,
            };

            connectionModelMock.create.mockResolvedValue(mockCreateResult);

            const result =
                await connectionService.createConnection(mockCreateData);

            expect(result).toEqual({ connection: mockCreateResult });
        });

        it('should return an error if connection creation fails', async () => {
            connectionModelMock.create.mockResolvedValue(null);

            const mockCreateData = {
                oid: '1',
                name: 'Test Connection',
                key: 'key',
                type: ConnectionType.OIDC,
                config: {},
            };

            const result =
                await connectionService.createConnection(mockCreateData);

            expect(result).toEqual({
                error: {
                    message: 'Failed to create connection',
                    info: 'Creation was falsy',
                    code: 500,
                },
            });
        });
    });
});
