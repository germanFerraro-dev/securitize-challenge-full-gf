import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EtherscanService {
  private readonly etherscanBaseUrl = process.env.ETHERSCAN_API_URL || 'https://api.etherscan.io/api';
  private readonly apiKey = process.env.ETHERSCAN_API_KEY || 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';

  async getWalletData(walletAddress: string): Promise<number> {
    const url = `${this.etherscanBaseUrl}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      const balance = Number(response.data.result) / 1e18;
      return balance;
    } catch (error) {
      throw new Error('Failed to fetch wallet balance from Etherscan.');
    }
  }

  async checkWalletValidity(walletAddress: string): Promise<boolean> {
    const url = `${this.etherscanBaseUrl}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const result = data.status == '1' ? true : false;
      return result;
    } catch (error) {
      throw new Error('Failed to fetch wallet from Etherscan.');
    }
  }

  async isWalletOld(walletAddress: string): Promise<boolean> {
    const url = `${this.etherscanBaseUrl}?module=account&action=txlist&address=${walletAddress}&sort=asc&apikey=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === '1' && data.result) {
        const transactions = data.result;
        if (transactions.length > 0) {
          const firstTransactionTimestamp = parseInt(transactions[0].timeStamp);
          const currentTime = Math.floor(new Date().getTime() / 1000);
          const timeDifferenceInSeconds =
            currentTime - firstTransactionTimestamp;
          const oneYearInSeconds = 365 * 24 * 60 * 60;

          if (timeDifferenceInSeconds >= oneYearInSeconds) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      throw new Error('Error checking wallet status');
    }
  }
}
