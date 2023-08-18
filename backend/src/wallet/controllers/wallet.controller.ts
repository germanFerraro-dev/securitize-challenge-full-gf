import { Controller, Post, Query, Get, Param, Put, Body } from '@nestjs/common';
import { Wallet } from '../entities/wallet.entity';
import { WalletService } from '../services/wallet.service';
import { GetBalanceResponseDto } from 'wallet/dto/get-balance.dto';
import { IsWalletOldResponseDto } from 'wallet/dto/wallet-age.dto';
import { AddWalletDto } from 'wallet/dto/add-wallet.dto';
import { DeleteWalletDto } from 'wallet/dto/delete-wallet.dto';
import { DeleteWalletResponseDto } from 'wallet/dto/delete-wallet.dto';
import { MarkAsFavoriteDto } from 'wallet/dto/mark-favorite.dto';
import { RemoveFromFavoritesDto } from 'wallet/dto/remove-favorite.dto';
import { MarkAsFavoriteResponseDto } from 'wallet/dto/mark-favorite.dto';
import { RemoveFromFavoriteResponseDto } from 'wallet/dto/remove-favorite.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('getWallets')
  getWallets(@Query('orderBy') orderBy: string): Promise<Wallet[]> {
    return this.walletService.getWallets(orderBy);
  }

  @Post('addWallet')
  async addWallet(@Body() walletAddress: AddWalletDto): Promise<any> {
    const success = await this.walletService.addWallet(walletAddress);
    return success;
  }

  @Post('deleteWallet')
  deleteWallet(
    @Body() walletAddress: DeleteWalletDto,
  ): Promise<DeleteWalletResponseDto> {
    return this.walletService.deleteWallet(walletAddress);
  }

  @Get('getWalletBalance/:walletAddress')
  getWalletBalance(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetBalanceResponseDto> {
    return this.walletService.getWalletBalance(walletAddress);
  }

  @Get('iswalletold/:walletAddress')
  isWalletOld(
    @Param('walletAddress') walletAddress: string,
  ): Promise<IsWalletOldResponseDto> {
    return this.walletService.isWalletOld(walletAddress);
  }

  @Put('markAsFavorite')
  markAsFavorite(
    @Body() walletAddress: MarkAsFavoriteDto,
  ): Promise<MarkAsFavoriteResponseDto> {
    return this.walletService.markAsFavorite(walletAddress);
  }

  @Put('removeFromFavorites')
  removeFromFavorites(
    @Body() walletAddress: RemoveFromFavoritesDto,
  ): Promise<RemoveFromFavoriteResponseDto> {
    return this.walletService.removeFromFavorites(walletAddress);
  }
}
