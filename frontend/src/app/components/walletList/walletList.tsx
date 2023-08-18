import { Switch, CircularProgress } from '@mui/material';
import { WalletComponent } from '../wallet';
import { WalletForm } from '../walletForm';
import { Wallet } from '../../../types/Wallet';
import { useWalletList } from './useWalletList';
import { Divider } from '@mui/material';

const WalletList: React.FC = () => {
  const {
    walletList,
    handleSortWallets,
    isLoading,
    isError
  } = useWalletList();
  
  const sortLabel = { inputProps: { 'aria-label': 'Sort By Favorites' } };

  const walletComponentList = walletList?.map((wallet: Wallet) => (
    <WalletComponent address={wallet.address} walletData={wallet} key={wallet.id} />
  ))

  const sortByFavorites = (
    <div className="flex direction-row items-center justify-end">
      <div>Sort By Favorites</div>
      <Switch onClick={() => handleSortWallets()} {...sortLabel} />
    </div>
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }


  return (
    <div>
      <div className="flex flex-column justify-between mt-10 pb-4">
        <WalletForm />
        {sortByFavorites}
      </div>
      <Divider />
      <div className="mt-4">
        {walletList.length >= 1 ? (
          walletComponentList
        ) : (
          <div className="p-2 m-8">No wallets to display at the moment.</div>
        )}
      </div>
    </div>
  );
}

export default WalletList;
