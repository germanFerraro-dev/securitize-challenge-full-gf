import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExchangeRateInterface } from '../../types/ExchangeRate';

const initialState: ExchangeRateInterface[] = [];

const exchangeRateSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setRates: (state, action: PayloadAction<ExchangeRateInterface[]>) => {
      return action.payload;
    },
    setRate: (state, action: PayloadAction<{ currency: string; rate: number }>) => {
      const { currency, rate } = action.payload;
      const rateToUpdate = state.find(rate => rate.currency === currency);

      if (rateToUpdate) {
        rateToUpdate.rate = rate;
      }
    }
  },
});

export const { setRates, setRate } = exchangeRateSlice.actions;


export default exchangeRateSlice.reducer;