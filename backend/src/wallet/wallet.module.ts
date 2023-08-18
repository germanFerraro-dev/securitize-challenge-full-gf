import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { EtherscanService } from './services/etherscan.service';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService, EtherscanService],
  controllers: [WalletController],
  exports: [TypeOrmModule],
})
export class WalletModule {}
