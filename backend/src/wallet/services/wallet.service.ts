import { Injectable } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddWalletDto, AddWalletResponseDto } from 'wallet/dto/add-wallet.dto';
import { IsWalletOldResponseDto } from 'wallet/dto/wallet-age.dto';
import { GetBalanceResponseDto } from 'wallet/dto/get-balance.dto';
import {
  DeleteWalletDto,
  DeleteWalletResponseDto,
} from 'wallet/dto/delete-wallet.dto';
import {
  MarkAsFavoriteDto,
  MarkAsFavoriteResponseDto,
} from 'wallet/dto/mark-favorite.dto';
import {
  RemoveFromFavoriteResponseDto,
  RemoveFromFavoritesDto,
} from 'wallet/dto/remove-favorite.dto';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    private readonly etherscanService: EtherscanService,
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
  ) {}

  async getWallets(orderBy: string): Promise<Wallet[]> {
    const order: any = {};

    if (orderBy === 'favorite') {
      order.isFavorite = 'DESC';
    } else {
      order.createdAt = 'DESC';
    }

    try {
      return await this.walletRepo.find({
        order,
      });
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching wallets.');
    }
  }

  async addWallet(walletAddress: AddWalletDto): Promise<AddWalletResponseDto> {
    const isWalletValid = await this.etherscanService.checkWalletValidity(
      walletAddress.walletAddress,
    );

    if (isWalletValid) {
      try {
        const newAddr = new Wallet();
        newAddr.address = walletAddress.walletAddress;
        await this.walletRepo.save(newAddr);
        return {
          data: newAddr,
          success: true,
          message: 'Wallet added successfully.',
        };
      } catch (error) {
        if (error.code === '23505') {
          return {
            success: false,
            message: 'Wallet already exists.',
          };
        } else {
          console.error(error);
          return {
            success: false,
            message: 'An error occurred while adding the wallet.',
          };
        }
      }
    } else {
      return {
        success: false,
        message: 'Invalid wallet address.',
      };
    }
  }

  async deleteWallet(
    walletAddress: DeleteWalletDto,
  ): Promise<DeleteWalletResponseDto> {
    try {
      const wallet = await this.walletRepo
        .createQueryBuilder('wallet')
        .where('wallet.address = :address', {
          address: walletAddress.walletAddress,
        })
        .getOne();

      if (!wallet) {
        return { success: false, message: 'Wallet not found.' };
      }

      await this.walletRepo.remove(wallet);

      return { success: true, message: 'Wallet deleted successfully.' };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'An error occurred while deleting the wallet.',
      };
    }
  }

  async getWalletBalance(
    walletAddress: string,
  ): Promise<GetBalanceResponseDto> {
    try {
      const walletData = await this.etherscanService.getWalletData(
        walletAddress,
      );
      return { walletBalance: walletData };
    } catch (error) {
      throw new Error('Failed to get wallet data.');
    }
  }

  async isWalletOld(walletAddress: string): Promise<IsWalletOldResponseDto> {
    try {
      const data = await this.etherscanService.isWalletOld(walletAddress);
      return { isWalletOld: data };
    } catch (error) {
      throw new Error('Failed to get wallet data.');
    }
  }

  async markAsFavorite(
    walletAddress: MarkAsFavoriteDto,
  ): Promise<MarkAsFavoriteResponseDto> {
    try {
      const wallet = await this.walletRepo
        .createQueryBuilder('wallet')
        .where('wallet.address = :address', {
          address: walletAddress.walletAddress,
        })
        .getOne();

      if (!wallet) {
        return { success: false, message: 'Wallet not found.' };
      }

      if (wallet.isFavorite) {
        return {
          success: false,
          message: 'Wallet is already marked as favorite.',
        };
      }

      await this.walletRepo
        .createQueryBuilder()
        .update(Wallet)
        .set({ isFavorite: true })
        .where('address = :address', { address: walletAddress.walletAddress })
        .execute();

      return {
        success: true,
        message: `ID ${walletAddress.walletAddress} marked as favorite.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'An error occurred while marking the wallet as favorite.',
      };
    }
  }

  async removeFromFavorites(
    walletAddress: RemoveFromFavoritesDto,
  ): Promise<RemoveFromFavoriteResponseDto> {
    try {
      const wallet = await this.walletRepo
        .createQueryBuilder('wallet')
        .where('wallet.address = :address', {
          address: walletAddress.walletAddress,
        })
        .getOne();

      if (!wallet) {
        return { success: false, message: 'Wallet not found.' };
      }

      if (wallet.isFavorite == false) {
        return {
          success: false,
          message: 'Wallet is not marked as favorite.',
        };
      }

      await this.walletRepo
        .createQueryBuilder()
        .update(Wallet)
        .set({ isFavorite: false })
        .where('address = :address', { address: walletAddress.walletAddress })
        .execute();

      return {
        success: true,
        message: `ID ${walletAddress.walletAddress} removed from favorites.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'An error occurred while marking the wallet as favorite.',
      };
    }
  }
}
