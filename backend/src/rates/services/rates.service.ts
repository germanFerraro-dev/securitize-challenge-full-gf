import { Injectable } from '@nestjs/common';
import {
  GetExchangeRateDto,
  GetExchangeRateReponseDto,
} from '../dto/get-rate.dto';
import { ExchangeRateService } from './exchange-rate.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from 'rates/entities/rate.entity';

@Injectable()
export class RatesService {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(Rate)
    private exchangeRepo: Repository<Rate>,
  ) {}

  async getExchangeRates(): Promise<GetExchangeRateReponseDto[]> {
    try {
      const USDRate = await this.exchangeRateService.getUSDtoETHExchangeRate();
      const EURRate = await this.exchangeRateService.getEURtoETHExchangeRate();

      return [USDRate, EURRate];
    } catch (error) {
      throw new Error('Failed to get exchange rate.');
    }
  }
}
