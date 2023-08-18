import { IsString } from 'class-validator';
import { ApiResponseDto } from 'dto/api-response.dto';

export class DeleteWalletDto {
  @IsString()
  walletAddress: string;
}

export class DeleteWalletResponseDto extends ApiResponseDto {}
