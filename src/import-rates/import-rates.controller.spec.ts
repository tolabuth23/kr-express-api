import { Test, TestingModule } from '@nestjs/testing';
import { ImportRatesController } from './import-rates.controller';

describe('ImportRatesController', () => {
  let controller: ImportRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportRatesController],
    }).compile();

    controller = module.get<ImportRatesController>(ImportRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
