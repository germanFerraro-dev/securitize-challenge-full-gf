import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Wallet, WalletApiRequest, BalanceApiResponse, WalletAgeApiResponse } from '../types/Wallet';
import { API_URL } from '../config';
import { ApiResponse } from '../types/ApiResponse';

export const walletsApi = createApi({
  reducerPath: 'walletsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getWallets: builder.query<Wallet[], undefined>({
      query: () => 'wallet/getwallets',
    }),
    getBalance: builder.query<BalanceApiResponse, WalletApiRequest>({
      query: (getBalanceRequest) => ({
        url: `wallet/getwalletbalance/${getBalanceRequest.walletAddress}`
      }),
    }),
    isWalletOld: builder.query<WalletAgeApiResponse, WalletApiRequest>({
      query: (isWalletOldRequest) => ({
        url: `wallet/iswalletold/${isWalletOldRequest.walletAddress}`
      }),
    }),
    addWallet: builder.mutation<ApiResponse, WalletApiRequest>({
      query: (addWalletRequest) => ({
        url: 'wallet/addWallet',
        method: 'POST',
        body: addWalletRequest
      }),
    }),
    deleteWallet: builder.mutation<ApiResponse, WalletApiRequest>({
      query: (deletewalletRequest) => ({
        url: 'wallet/deleteWallet',
        method: 'POST',
        body: deletewalletRequest
      }),
    }),
    markAsFavorite: builder.mutation<ApiResponse, WalletApiRequest>({
      query: (markAsFavoriteMutation) => ({
        url: 'wallet/markasfavorite',
        method: 'PUT',
        body: markAsFavoriteMutation
      }),
    }),
    removeFromFavorites: builder.mutation<ApiResponse, WalletApiRequest>({
      query: (removeFromFavroritesMutation) => ({
        url: 'wallet/removefromfavorites',
        method: 'PUT',
        body: removeFromFavroritesMutation
      }),
    }),
  })
});

export const {
  useGetWalletsQuery,
  useGetBalanceQuery,
  useIsWalletOldQuery,
  useAddWalletMutation,
  useDeleteWalletMutation,
  useMarkAsFavoriteMutation,
  useRemoveFromFavoritesMutation,
} = walletsApi;
