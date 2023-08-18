import { useEffect, useState } from 'react';
import { useGetWalletsQuery } from '../../../data/wallets.api';
import { useDispatch, useSelector } from 'react-redux';
import { setWallets } from '../../../store/slices/wallets.slice';
import { RootState } from '../../../store/store';
import { walletSorter } from '../../../utils/walletSorter';
import { Wallet } from '../../../types/Wallet';

type UseWalletListReturnType = {
    walletList: Wallet[];
    handleSortWallets: () => void;
    isLoading: boolean;
    isError: boolean;
};


export const useWalletList = (): UseWalletListReturnType => {
    const { data, isLoading, isError } = useGetWalletsQuery(undefined);
    const dispatch = useDispatch(); 
    const wallets = useSelector((state: RootState) => state.wallets);
    const [sortByFavorite, setSortByFavorite] = useState(false);

    const walletList = walletSorter(wallets, sortByFavorite);

    useEffect(() => {
      if (data) {
        dispatch(setWallets(data));
      }
    }, [data, dispatch]);

    const handleSortWallets = () => {
        setSortByFavorite((prevState) => !prevState);
    }


    return {
        walletList,
        handleSortWallets,
        isLoading,
        isError
    }
}