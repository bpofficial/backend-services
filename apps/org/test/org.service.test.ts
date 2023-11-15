import { MemberServiceProvider, UserServiceProvider } from '@app/clients';
import { CreateOrgRequest } from '@app/proto/org';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { OrgService } from '../src/org.service';
import { mockOrg } from './fixtures/mockOrg';

describe('OrgService', () => {
    let orgService: OrgService;
    let orgModelMock: any;
    let userServiceMock: any;
    let memberServiceMock: any;

    beforeEach(async () => {
        orgModelMock = {
            findById: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
        };
        userServiceMock = {
            GetUser: jest.fn(),
        };
        memberServiceMock = {
            Create: jest.fn(),
            DeleteAll: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrgService,
                {
                    provide: getModelToken('organisation'),
                    useValue: orgModelMock,
                },
                {
                    provide: UserServiceProvider,
                    useValue: {
                        getService: () => userServiceMock,
                    },
                },
                {
                    provide: MemberServiceProvider,
                    useValue: {
                        getService: () => memberServiceMock,
                    },
                },
            ],
        }).compile();

        orgService = module.get<OrgService>(OrgService);
    });

    describe('getOrgById', () => {
        it('should return org data if found', async () => {
            orgModelMock.findById.mockResolvedValue(mockOrg);
            const result = await orgService.getOrgById('1');
            expect(result.org).toEqual(mockOrg);
        });

        it('should return an error if org not found', async () => {
            orgModelMock.findById.mockResolvedValue(null);
            const result = await orgService.getOrgById('unknown');
            expect(result.error).toEqual({ message: 'Not found' });
        });

        it('should return an error on exception', async () => {
            orgModelMock.findById.mockRejectedValue(
                new Error('Database error'),
            );
            const result = await orgService.getOrgById('1');
            expect(result.error).toEqual({ message: 'An error occured' });
        });
    });

    describe('getOrgByDomain', () => {
        it('should return org data if found', async () => {
            orgModelMock.findOne.mockResolvedValue(mockOrg);
            const result = await orgService.getOrgByDomain('example.com');
            expect(result.org).toEqual(mockOrg);
        });

        it('should return an error if org not found', async () => {
            orgModelMock.findOne.mockResolvedValue(null);
            const result = await orgService.getOrgByDomain('unknown.com');
            expect(result.error).toEqual({ message: 'Not found' });
        });

        it('should return an error on exception', async () => {
            orgModelMock.findOne.mockRejectedValue(new Error('Database error'));
            const result = await orgService.getOrgByDomain('example.com');
            expect(result.error).toEqual({ message: 'An error occured' });
        });
    });

    describe('createOrg', () => {
        const mockCreateOrgRequest: CreateOrgRequest = {
            name: 'Org1',
            domain: 'org1.com',
            owner: 'user1',
            callbackUrl: 'https://org1.com/cb',
        };

        beforeEach(() => {
            userServiceMock.GetUser.mockResolvedValue({
                user: { id: 'user1', name: 'User1' },
                error: null,
            });
            memberServiceMock.Create.mockResolvedValue({ success: true });
        });

        it('should successfully create an org', async () => {
            orgModelMock.create.mockResolvedValue(mockOrg);
            const result = await orgService.createOrg(mockCreateOrgRequest);
            expect(result.org).toEqual(mockOrg);
            expect(userServiceMock.GetUser).toHaveBeenCalledWith({
                uid: 'user1',
            });
            expect(memberServiceMock.Create).toHaveBeenCalled();
        });

        it('should return an error if user not found', async () => {
            userServiceMock.GetUser.mockResolvedValue({
                user: null,
                error: { message: 'User not found' },
            });
            const result = await orgService.createOrg(mockCreateOrgRequest);
            expect(result.error).toEqual({ message: 'User not found' });
        });

        it('should return an error on org creation failure', async () => {
            orgModelMock.create.mockRejectedValue(new Error('Creation failed'));
            const result = await orgService.createOrg(mockCreateOrgRequest);
            expect(result.error).toEqual({ message: 'An error occured' });
        });
    });

    describe('deleteOrg', () => {
        const oid = '1';
        const uid = 'user1';

        beforeEach(() => {
            memberServiceMock.DeleteAll.mockResolvedValue({ success: true });
        });

        it('should successfully delete an org and its members', async () => {
            orgModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });
            const result = await orgService.deleteOrg(oid, uid);
            expect(result.success).toBeTruthy();
        });

        it('should return failure if no org is deleted', async () => {
            orgModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });
            const result = await orgService.deleteOrg(oid, uid);
            expect(result.success).toBeFalsy();
        });

        it('should return failure on exception', async () => {
            orgModelMock.deleteOne.mockRejectedValue(
                new Error('Deletion failed'),
            );
            const result = await orgService.deleteOrg(oid, uid);
            expect(result.success).toBeFalsy();
        });
    });
});
