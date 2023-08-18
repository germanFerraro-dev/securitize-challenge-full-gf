import { IsString } from 'class-validator';
import { ApiResponseDto } from 'dto/api-response.dto';
import { WalletDto } from './wallet.dto';

export class AddWalletDto {
  @IsString()
  walletAddress: string;
}

export class AddWalletResponseDto extends ApiResponseDto {
  data?: WalletDto;
}
