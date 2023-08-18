import { Controller, Get } from '@nestjs/common';

import { RatesService } from 'rates/services/rates.service';
import { GetExchangeRateReponseDto } from 'rates/dto/get-rate.dto';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get('getExchangeRates')
  getExchangeRates(): Promise<GetExchangeRateReponseDto[]> {
    return this.ratesService.getExchangeRates();
  }
}
