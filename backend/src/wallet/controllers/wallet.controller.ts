import { Controller, Post, Query, Get, Param, Put, Body } from '@nestjs/common';
import { Wallet } from '../entities/wallet.entity';
import { WalletService } from '../services/wallet.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GetBalanceResponseDto } from 'wallet/dto/get-balance.dto';
import { IsWalletOldResponseDto } from 'wallet/dto/wallet-age.dto';
import { AddWalletDto } from 'wallet/dto/add-wallet.dto';
import { AddWalletResponseDto } from 'wallet/dto/add-wallet.dto';
import { DeleteWalletDto } from 'wallet/dto/delete-wallet.dto';
import { DeleteWalletResponseDto } from 'wallet/dto/delete-wallet.dto';
import { MarkAsFavoriteDto } from 'wallet/dto/mark-favorite.dto';
import { RemoveFromFavoritesDto } from 'wallet/dto/remove-favorite.dto';
import { MarkAsFavoriteResponseDto } from 'wallet/dto/mark-favorite.dto';
import { RemoveFromFavoriteResponseDto } from 'wallet/dto/remove-favorite.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiOperation({ summary: 'Get wallets' })
  @ApiOkResponse({
    description: 'Successful response',
    type: Wallet,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('getWallets')
  getWallets(@Query('orderBy') orderBy?: string): Promise<Wallet[]> {
    return this.walletService.getWallets(orderBy);
  }

  @ApiOperation({ summary: 'Add wallet' })
  @ApiOkResponse({
    description: 'Successful response',
    type: AddWalletResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('addWallet')
  async addWallet(
    @Body() walletAddress: AddWalletDto,
  ): Promise<AddWalletResponseDto> {
    const success = await this.walletService.addWallet(walletAddress);
    return success;
  }

  @ApiOperation({ summary: 'Delete wallet' })
  @ApiOkResponse({
    description: 'Successful response',
    type: DeleteWalletResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('deleteWallet')
  deleteWallet(
    @Body() walletAddress: DeleteWalletDto,
  ): Promise<DeleteWalletResponseDto> {
    return this.walletService.deleteWallet(walletAddress);
  }

  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiOkResponse({
    description: 'Successful response',
    type: GetBalanceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @Get('getWalletBalance/:walletAddress')
  getWalletBalance(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetBalanceResponseDto> {
    return this.walletService.getWalletBalance(walletAddress);
  }

  @ApiOperation({ summary: 'Check if a wallet is old' })
  @ApiOkResponse({
    description: 'Successful response',
    type: IsWalletOldResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @Get('iswalletold/:walletAddress')
  isWalletOld(
    @Param('walletAddress') walletAddress: string,
  ): Promise<IsWalletOldResponseDto> {
    return this.walletService.isWalletOld(walletAddress);
  }

  @ApiOperation({ summary: 'Mark a wallet as favorite' })
  @ApiOkResponse({
    description: 'Successful response',
    type: MarkAsFavoriteResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put('markAsFavorite')
  markAsFavorite(
    @Body() walletAddress: MarkAsFavoriteDto,
  ): Promise<MarkAsFavoriteResponseDto> {
    return this.walletService.markAsFavorite(walletAddress);
  }

  @ApiOperation({ summary: 'Remove wallet from favorites' })
  @ApiOkResponse({
    description: 'Successful response',
    type: RemoveFromFavoriteResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put('removeFromFavorites')
  removeFromFavorites(
    @Body() walletAddress: RemoveFromFavoritesDto,
  ): Promise<RemoveFromFavoriteResponseDto> {
    return this.walletService.removeFromFavorites(walletAddress);
  }
}
