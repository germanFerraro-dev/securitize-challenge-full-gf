import {
    useDeleteWalletMutation,
    useMarkAsFavoriteMutation,
    useRemoveFromFavoritesMutation,
    useGetWalletsQuery
} from "../../../../data/wallets.api";
import { useDispatch } from "react-redux";
import { setError } from "../../../../store/slices/errorHandler.slice";

type UseWalletActionsReturnType = {
    deleteWalletHandler: () => void;
    markAsFavoriteHandler: () => void;
    removeFromFavoritesHandler: () => void;
};


export const useWalletActions = (address: string): UseWalletActionsReturnType => {
    const [deleteWallet] = useDeleteWalletMutation();
    const [markAsFavorite] = useMarkAsFavoriteMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();
    const dispatch = useDispatch(); 
    const { refetch } = useGetWalletsQuery(undefined);

    const deleteWalletHandler = async () => {
        try {
          const response = await deleteWallet({walletAddress: address});

          if ('data' in response) {
            const apiResponse = response.data;
            if (apiResponse.success) {
                refetch();
            } else {
                dispatch(setError('An error occurred while performing the action.'));
            }
          } else if ('error' in response) {
            dispatch(setError('An error occurred while performing the action.'));
          }
        } catch (err) {
            dispatch(setError('An error occurred while performing the action.'));
            console.error(err);
        }
    }
    
    const markAsFavoriteHandler = async () => {
        try {
          const response = await markAsFavorite({walletAddress: address});
    
          if ('data' in response) {
            const apiResponse = response.data;
            if (apiResponse.success) {
                refetch();
            } else {
                dispatch(setError('An error occurred while performing the action.'));
            }
          } else if ('error' in response) {
            dispatch(setError('An error occurred while performing the action.'));
          }
        } catch (err) {
          dispatch(setError('An error occurred while performing the action.'));
          console.error(err);
        }
    }
    
    const removeFromFavoritesHandler = async () => {
        try {
          const response = await removeFromFavorites({
            walletAddress: address,
          });

          if ('data' in response) {
            const apiResponse = response.data;
            if (apiResponse.success) {
                refetch();
            } else {
                dispatch(setError('An error occurred while performing the action.'));
            }
          } else if ('error' in response) {
            dispatch(setError('An error occurred while performing the action.'));
          }
        } catch (err) {
            dispatch(setError("An error occurred while performing the action."));
            console.error(err);
        }
    }


    return {
        deleteWalletHandler,
        markAsFavoriteHandler,
        removeFromFavoritesHandler
    }
}