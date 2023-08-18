import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetExchangeRateReponseDto } from 'rates/dto/get-rate.dto';

@Injectable()
export class ExchangeRateService {
  private coinGeckoApiUrl =
    process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

  async fetchExchangeRate(
    targetCurrency: string,
  ): Promise<GetExchangeRateReponseDto> {
    const response = await axios.get(`${this.coinGeckoApiUrl}/simple/price`, {
      params: {
        ids: 'ethereum',
        vs_currencies: targetCurrency.toLowerCase(),
      },
    });

    const rate =
      response.data.ethereum[targetCurrency.toLowerCase()].toFixed(2);

    return {
      currency: targetCurrency,
      rate,
    };
  }

  async getUSDtoETHExchangeRate(): Promise<GetExchangeRateReponseDto> {
    return this.fetchExchangeRate('usd');
  }

  async getEURtoETHExchangeRate(): Promise<GetExchangeRateReponseDto> {
    return this.fetchExchangeRate('eur');
  }
}
