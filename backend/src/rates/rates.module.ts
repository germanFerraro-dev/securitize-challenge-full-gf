import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesService } from './services/rates.service';
import { RatesController } from './controllers/rates.controller';
import { Rate } from './entities/rate.entity';
import { ExchangeRateService } from './services/exchange-rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RatesService, ExchangeRateService],
  controllers: [RatesController],
  exports: [TypeOrmModule],
})
export class RatesModule {}
