import { IsNumber, IsString } from 'class-validator';

export class GetBalanceDto {
  @IsString()
  walletAddress: string;
}

export class GetBalanceResponseDto {
  @IsNumber()
  walletBalance: number;
}
