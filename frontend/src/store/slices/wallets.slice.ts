import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from '../../types/Wallet';


const walletsSlice = createSlice({
  name: 'wallets',
  initialState: [] as Wallet[],
  reducers: {
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      return action.payload;
    },
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.push(action.payload);
    },
    deleteWallet: (state, action: PayloadAction<string>) => {
      return state.filter(wallet => wallet.id !== action.payload);
    },
  },
});

export const { setWallets, addWallet } = walletsSlice.actions;
export default walletsSlice.reducer;