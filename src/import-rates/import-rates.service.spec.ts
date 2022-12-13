import { Test, TestingModule } from '@nestjs/testing';
import { ImportRatesService } from './import-rates.service';

describe('ImportRatesService', () => {
  let service: ImportRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportRatesService],
    }).compile();

    service = module.get<ImportRatesService>(ImportRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
