import { useState } from 'react';
import { useAddWalletMutation } from '../../../data/wallets.api';
import { useGetWalletsQuery } from '../../../data/wallets.api';
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/errorHandler.slice';


type UseWalletFormReturnType = {
    handleAddWallet: () => void;
    addressError: boolean;
    address: string;
    setAddress: (value: React.SetStateAction<string>) => void;
    successMessage: boolean;
    setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
};

type UseWalletFormParams = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useWalletForm = ({setIsModalOpen}: UseWalletFormParams): UseWalletFormReturnType => {
    const [addWallet] = useAddWalletMutation();
    const [addressError, setAddressError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch(); 
    const [address, setAddress] = useState("");
    const { refetch } = useGetWalletsQuery(undefined);
  
  
    const handleAddWallet = async () => {
      setSuccessMessage(false);
      if (!address) {
        setAddressError(true);
      } else {
        setAddressError(false);
        try {
          const response = await addWallet({walletAddress: address});
          if ('data' in response) {
            const apiResponse = response.data;
            if (apiResponse.success) {
              setSuccessMessage(true);
              refetch();
              setAddress('');
              setIsModalOpen(false);
            } else {
              dispatch(setError(apiResponse.message));   
              setAddress('');
            }
          } else if ('error' in response) {
            dispatch(setError('An error occurred while adding the wallet.'));
            console.error(response.error);
            setAddress('')
          }
        } catch (err) {
          dispatch(setError('An error occurred while adding the wallet.'));
          console.error(err);
          setAddress('')
        }
      }
    };
  
    return {
        handleAddWallet,
        addressError,
        address,
        setAddress,
        successMessage,
        setSuccessMessage
    }
}