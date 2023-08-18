export interface Wallet {
    id: string;
    address: string;
    isFavorite: boolean;
    createdAt: string
}

export interface WalletApiRequest {
    walletAddress: string;
}
export interface AddWalletRequest {
    walletAddress: string;
}

export interface DeleteWalletRequest {
    walletAddress: string;
}

export interface MarkAsFavoriteRequest {
    walletAddress: string;
}

export interface RemoveFromFavoritesRequest {
    walletAddress: string;
}

export interface BalanceApiResponse {
    walletBalance: number;
}

export interface WalletAgeApiResponse {
    isWalletOld: boolean;
}