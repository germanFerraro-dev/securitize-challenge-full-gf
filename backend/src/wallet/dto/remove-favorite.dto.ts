import { IsString } from 'class-validator';
import { ApiResponseDto } from 'dto/api-response.dto';

export class RemoveFromFavoritesDto {
  @IsString()
  walletAddress: string;
}

export class RemoveFromFavoriteResponseDto extends ApiResponseDto {}
