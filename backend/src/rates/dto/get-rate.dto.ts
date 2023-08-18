import { IsNumber, IsString } from 'class-validator';

export class GetExchangeRateDto {
  @IsString()
  currency: string;
}
export class GetExchangeRateReponseDto {
  @IsString()
  currency: string;
  @IsNumber()
  rate: number;
}
