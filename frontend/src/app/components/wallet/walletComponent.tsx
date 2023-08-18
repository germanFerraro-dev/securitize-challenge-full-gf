import { Card, CardContent, Typography } from '@mui/material';
import { useIsWalletOldQuery } from '../../../data/wallets.api';
import { Alert } from '@mui/material';
import WalletActions from './walletActions/walletActions';
import { Wallet } from '../../../types/Wallet';
import { Balance } from '../balance';

type WalletProps = {
    address: string;
    walletData: Wallet;
}

const WalletComponent: React.FC<WalletProps> = ({address, walletData}) => {
  const { data: walletAge } = useIsWalletOldQuery({walletAddress: address});

  const oldWalletError = walletAge && walletAge.isWalletOld == true && (
    <CardContent>
      <Alert severity="error">Wallet is Old!</Alert>
    </CardContent>
  )


  return (
    <div className='py-2'>
        <Card variant="outlined">
            {oldWalletError}
          <WalletActions address={address} walletData={walletData} />
          <CardContent>
            <Typography fontSize={14} color="text.secondary" gutterBottom>
              Address
            </Typography>
            <Typography variant="h6" fontSize={16} component="div">
              {address}
            </Typography>
        </CardContent>
          <Balance address={address} />
        </Card>
    </div>
  );
}

export default WalletComponent;
