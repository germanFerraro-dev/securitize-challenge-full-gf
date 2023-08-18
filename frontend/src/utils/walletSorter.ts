import { Wallet } from "../types/Wallet";

export const walletSorter = (wallets: Wallet[], sortByFavorite: boolean): Wallet[] => {
    const sortedWallets = [...wallets];
    sortedWallets.sort((a, b) => {
    if (sortByFavorite) {
        return b.isFavorite ? 1 : -1;
        }
        return a.id.toString().localeCompare(b.id.toString());
    });

    return sortedWallets;
}