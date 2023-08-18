import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class WalletDto {
  @IsNumber()
  id: number;
  @IsString()
  address: string;
  @IsBoolean()
  isFavorite: boolean;
  createdAt: Date;
}
