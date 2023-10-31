import { Test, TestingModule } from '@nestjs/testing';
import { OpaService } from './opa.service';

describe('OpaService', () => {
    let service: OpaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OpaService],
        }).compile();

        service = module.get<OpaService>(OpaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
