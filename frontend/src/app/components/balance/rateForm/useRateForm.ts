
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRate } from '../../../../store/slices/exchangeRates.slice';

import { ExchangeRateInterface } from '../../../../types/ExchangeRate';

type UseRateFormReturnType = {
    handleEditMode: () => void;
    editRateHandler: () => void;
    editedRate: string | number;
    setEditedRate: React.Dispatch<React.SetStateAction<string | number>>;
    selectedRateInfo?: ExchangeRateInterface;
};

type UseRateFormProps = {
    selectedRate: string;
    setIsEditingRate: React.Dispatch<React.SetStateAction<boolean>>;
    rates: ExchangeRateInterface[];
}

export const useRateForm = ({
  selectedRate,
  setIsEditingRate,
  rates,
}: UseRateFormProps): UseRateFormReturnType => {
    const dispatch = useDispatch();

    const selectedRateInfo =
        rates && rates.find((rate) => rate.currency === selectedRate);

    const defaultRate = selectedRateInfo?.rate || "";
    const [editedRate, setEditedRate] = useState(defaultRate);

    const handleEditMode = () => {
        setEditedRate(defaultRate);
        setIsEditingRate(true);
    };

    const editRateHandler = () => {
        const inputString: string = editedRate.toString();
        const parsedNumber: number = parseFloat(inputString);
        const roundedNumber: number = parseFloat(parsedNumber.toFixed(2));
        dispatch(setRate({ currency: selectedRate, rate: Number(roundedNumber) }));
        setIsEditingRate(false);
    };

    return {
        handleEditMode,
        editRateHandler,
        editedRate,
        setEditedRate,
        selectedRateInfo
    };
};