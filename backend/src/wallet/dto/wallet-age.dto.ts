import { IsBoolean, IsString } from 'class-validator';

export class IsWalletOldDto {
  @IsString()
  walletAddress: string;
}

export class IsWalletOldResponseDto {
  @IsBoolean()
  isWalletOld: boolean;
}
