import { Card, CardContent, Typography } from '@mui/material';
import { useIsWalletOldQuery } from '../../../data/wallets.api';
import { useGetBalanceQuery } from '../../../data/wallets.api';
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
  const { data: walletBalance } = useGetBalanceQuery({walletAddress: address});

  const balance = walletBalance?.walletBalance as number;
  const fixedBalance = balance && balance.toFixed(4);

  const oldWalletError = walletAge && walletAge.isWalletOld == true && (
    <CardContent>
      <Alert severity="error">Wallet is Old!</Alert>
    </CardContent>
  )

  const balanceOverview = (walletBalance != undefined) && (
    <>
      <Typography fontSize={14} mt={2} color="text.secondary" gutterBottom>
        Balance
      </Typography>
      <Typography variant="h6" fontSize={16} component="div">
        {fixedBalance} ETH
      </Typography>
    </>
  );


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
            {balanceOverview}
        </CardContent>
          <Balance address={address} walletBalance={balance} />
        </Card>
    </div>
  );
}

export default WalletComponent;
