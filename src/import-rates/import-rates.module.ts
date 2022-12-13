import { Module } from '@nestjs/common';
import { ImportRatesController } from './import-rates.controller';
import { ImportRatesService } from './import-rates.service';

@Module({
  controllers: [ImportRatesController],
  providers: [ImportRatesService],
})
export class ImportRatesModule {}
