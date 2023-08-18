import { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  FormControl,
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  CircularProgress, 
  Card,
  Grid
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { RateForm } from './rateForm';
import { RootState } from '../../../store/store';
import { useGetBalanceQuery } from '../../../data/wallets.api';
import { ExchangeRateInterface } from '../../../types/ExchangeRate';

type BalanceProps = {
  address: string;
}

const Balance: React.FC<BalanceProps> = ({ address }) => {
  const { data: walletBalance } = useGetBalanceQuery({walletAddress: address});
  const rates: ExchangeRateInterface[] = useSelector((state: RootState) => state.rates);
  const [selectedRate, setSelectedRate] = useState('usd');
  const [isEditingRate, setIsEditingRate] = useState(false);

  const balance = walletBalance?.walletBalance as number;
  const selectedRateInfo =  rates && rates.find(rate => rate.currency === selectedRate);


  if (rates.length == 0 || !walletBalance) {
    return (
      <div className='h-48 flex items-center justify-center'>
        <CircularProgress />
      </div>
    );
  }
  
  const handleRateChange = (event: SelectChangeEvent) => {
    setIsEditingRate(false);
    setSelectedRate(event.target.value as string);
  }
  
  const selectedBalance = rates
    ? balance * (selectedRateInfo?.rate || 0) : 0;


  return (
    <Grid container spacing={1}>
      <RateForm
        address={address}
        selectedRate={selectedRate}
        isEditingRate={isEditingRate}
        setIsEditingRate={setIsEditingRate}
        rates={rates}
        walletBalance={balance}
      />
      <Grid item md={12} xl={6}>
        <Card
          sx={{
            height: "150px",
            padding: "1rem",
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#f8f9fb",
          }}
          variant="outlined"
        >
          <FormControl sx={{ width: "50%" }} className="py-2" fullWidth>
            <Select
              labelId="rate-select-label"
              id="rate-select"
              value={selectedRate}
              defaultValue={"USD"}
              onChange={handleRateChange}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
            </Select>
          </FormControl>
          <CardContent sx={{ paddingTop: "24px" }}>
            <Typography sx={{ padding: "0.5rem" }} variant="h5" component="div">
              {selectedBalance.toFixed(2)} $
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Balance;
