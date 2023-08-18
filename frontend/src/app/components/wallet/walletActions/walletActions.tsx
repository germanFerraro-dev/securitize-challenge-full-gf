import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWalletActions } from "./useWalletActions";
import { Wallet } from '../../../../types/Wallet';

type WalletActionsProps = {
    address: string;
    walletData: Wallet;
}

const WalletActions: React.FC<WalletActionsProps> = ({ address, walletData }) => {

  const {
      deleteWalletHandler,
      markAsFavoriteHandler,
      removeFromFavoritesHandler
  } = useWalletActions(address);

  const toggleFavorite =
    walletData.isFavorite == true ? (
      <IconButton
        onClick={() => removeFromFavoritesHandler()}
        aria-label="remove-favorite"
      >
        <StarIcon />
      </IconButton>
    ) : (
      <IconButton
        onClick={() => markAsFavoriteHandler()}
        aria-label="mark-favorite"
      >
        <StarBorderIcon />
      </IconButton>
    );


  return (
    <div className='py-2 px-2 flex justify-evenly'>
          {toggleFavorite}
        <IconButton onClick={()=> deleteWalletHandler()} aria-label="delete">
          <DeleteIcon />
        </IconButton>
    </div>
  );
}

export default WalletActions;
