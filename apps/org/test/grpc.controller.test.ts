import { OrgServiceProvider } from '@app/clients';
import { CreateOrgRequest } from '@app/proto/org';
import { OpaService } from '@app/shared';
import { Test, TestingModule } from '@nestjs/testing';
import { OrgGrpcController } from '../src/grpc.controller';
import { OrgService } from '../src/org.service';
import { mockOrg } from './fixtures/mockOrg';

describe('OrgGrpcController', () => {
    let grpcController: OrgGrpcController;
    let orgService: OrgService;

    beforeEach(async () => {
        const mockOrgService = {
            getOrgById: jest.fn(),
            getOrgByDomain: jest.fn(),
            createOrg: jest.fn(),
            deleteOrg: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrgGrpcController],
            providers: [
                {
                    provide: OpaService,
                    useValue: {
                        evaluatePolicy: jest.fn().mockReturnValue(true),
                    },
                },
                {
                    provide: OrgServiceProvider,
                    useValue: { getService: () => mockOrgService },
                },
                {
                    provide: OrgService,
                    useValue: mockOrgService,
                },
            ],
        }).compile();

        grpcController = module.get<OrgGrpcController>(OrgGrpcController);
        orgService = module.get<OrgService>(OrgService);
    });

    describe('findOrgById', () => {
        it('should return org data', async () => {
            const mockOrgResponse = { org: mockOrg };
            jest.spyOn(orgService, 'getOrgById').mockResolvedValue(
                mockOrgResponse,
            );

            const result = await grpcController.findOrgById({ oid: '1' });
            expect(result).toEqual(mockOrgResponse);
            expect(orgService.getOrgById).toHaveBeenCalledWith('1');
        });
    });

    describe('findOneByDomain', () => {
        it('should return org data for a given domain', async () => {
            const mockOrgResponse = {
                org: mockOrg,
            };
            jest.spyOn(orgService, 'getOrgByDomain').mockResolvedValue(
                mockOrgResponse,
            );

            const result = await grpcController.findOneByDomain({
                domain: 'org1.com',
            });
            expect(result).toEqual(mockOrgResponse);
            expect(orgService.getOrgByDomain).toHaveBeenCalledWith('org1.com');
        });
    });

    describe('createOrg', () => {
        it('should create an org and return the org data', async () => {
            const mockCreateOrgData: CreateOrgRequest = {
                name: 'Org2',
                domain: 'org2.com',
                owner: 'user2',
                callbackUrl: 'https://org2.com/cb',
            };
            const mockCreateOrgResponse = {
                org: { id: '2', ...mockCreateOrgData },
            };
            jest.spyOn(orgService, 'createOrg').mockResolvedValue(
                mockCreateOrgResponse,
            );

            const result = await grpcController.createOrg(mockCreateOrgData);
            expect(result).toEqual(mockCreateOrgResponse);
            expect(orgService.createOrg).toHaveBeenCalledWith(
                mockCreateOrgData,
            );
        });
    });

    describe('deleteOrg', () => {
        it('should delete an org', async () => {
            const deleteOrgData = { oid: '1', uid: 'user1' };
            jest.spyOn(orgService, 'deleteOrg').mockResolvedValue({
                success: true,
            });

            await grpcController.deleteOrg(deleteOrgData);
            expect(orgService.deleteOrg).toHaveBeenCalledWith('1', 'user1');
        });
    });
});
