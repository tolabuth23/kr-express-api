import { Module } from '@nestjs/common';
import { ImportRateValueController } from './importRateValue.controller';
import { ImportRateValueService } from './importRateValue.service';

@Module({
  controllers: [ImportRateValueController],
  providers: [ImportRateValueService],
})
export class ImportRateValueModule {}
