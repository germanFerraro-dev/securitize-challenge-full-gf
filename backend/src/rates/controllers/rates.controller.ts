import { Controller, Get } from '@nestjs/common';

import { RatesService } from 'rates/services/rates.service';
import { GetExchangeRateReponseDto } from 'rates/dto/get-rate.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('rates')
@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @ApiOperation({ summary: 'Get exchange rates' })
  @ApiOkResponse({
    description: 'Successful response',
    type: GetExchangeRateReponseDto,
  })
  @Get('getExchangeRates')
  getExchangeRates(): Promise<GetExchangeRateReponseDto[]> {
    return this.ratesService.getExchangeRates();
  }
}
