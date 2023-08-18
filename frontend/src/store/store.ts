import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { walletsApi } from "../data/wallets.api";
import { ratesApi } from "../data/rates.api";
import walletsSlice from "./slices/wallets.slice";
import errorHandler from "./slices/errorHandler.slice";
import exchangeRatesSlice from "./slices/exchangeRates.slice";

export const store = configureStore({
    reducer: combineReducers({
        [walletsApi.reducerPath]: walletsApi.reducer,
        [ratesApi.reducerPath]: ratesApi.reducer,
        wallets: walletsSlice,
        rates: exchangeRatesSlice,
        errorHandler: errorHandler
      }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(walletsApi.middleware)
      .concat(ratesApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;