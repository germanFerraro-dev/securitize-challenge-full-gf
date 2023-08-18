import React, { useEffect } from "react";
import { WalletList } from "../components/walletList";
import { useDispatch, useSelector } from 'react-redux';
import { setRates } from "../../store/slices/exchangeRates.slice";
import { RootState } from "../../store/store";
import { Snackbar, Alert } from "@mui/material";
import { useGetExchangeRatesQuery } from "../../data/rates.api";
import { clearError } from "../../store/slices/errorHandler.slice";

const MainPage: React.FC = () => {
  const { data } = useGetExchangeRatesQuery(undefined);
  const error = useSelector((state: RootState) => state.errorHandler);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (data) {
        dispatch(setRates(data))
    }
  }, [data, dispatch])

  const hasErrorMessage = error && error.length ? true : false;

  const errorMessageContainer = hasErrorMessage && (
    <Snackbar open={hasErrorMessage} autoHideDuration={3000} onClose={() => dispatch(clearError())} anchorOrigin={{vertical:'top', horizontal:'right'}}>
      <Alert onClose={() => dispatch(clearError())} severity="error">{error}</Alert>
    </Snackbar>
  )

  return (
    <> 
      {errorMessageContainer}
      <WalletList />
    </>
  );
};

export { MainPage };