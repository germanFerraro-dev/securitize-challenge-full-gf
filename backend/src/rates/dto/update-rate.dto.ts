import { IsNumber } from 'class-validator';

export class UpdateExchangeRateDto {
  @IsNumber()
  rate: number;
}
