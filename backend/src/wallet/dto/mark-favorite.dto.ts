import { IsString } from 'class-validator';
import { ApiResponseDto } from 'dto/api-response.dto';

export class MarkAsFavoriteDto {
  @IsString()
  walletAddress: string;
}

export class MarkAsFavoriteResponseDto extends ApiResponseDto {}
