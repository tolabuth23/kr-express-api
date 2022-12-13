import { Module } from '@nestjs/common';
import { ImportRateValueController } from './import-rate-value.controller';
import { ImportRateValueService } from './import-rate-value.service';

@Module({
  controllers: [ImportRateValueController],
  providers: [ImportRateValueService],
})
export class ImportRateValueModule {}
