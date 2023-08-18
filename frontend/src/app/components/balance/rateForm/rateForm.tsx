import { 
  CircularProgress, 
  IconButton, 
  TextField,
  Card,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useRateForm } from './useRateForm';
import { ExchangeRateInterface } from '../../../../types/ExchangeRate';

type RateFormProps = {
  address: string;
  selectedRate: string;
  isEditingRate: boolean;
  setIsEditingRate: React.Dispatch<React.SetStateAction<boolean>>;
  rates: ExchangeRateInterface[];
  walletBalance: number;
}


const RateForm: React.FC<RateFormProps> = ({
  selectedRate,
  isEditingRate,
  setIsEditingRate,
  rates,
  walletBalance
}) => {
    const {
        handleEditMode,
        editRateHandler,
        editedRate,
        setEditedRate,
        selectedRateInfo
    } = useRateForm({
        selectedRate,
        setIsEditingRate,
        rates
    });
    
    console.log(walletBalance, rates)

    if (rates.length == 0 || walletBalance == null) {
        return <CircularProgress />;
    }

    const editActions = (
        <div className="self-end">
        <IconButton onClick={() => editRateHandler()} aria-label="delete">
            <CheckIcon />
        </IconButton>
        <IconButton onClick={() => setIsEditingRate(false)} aria-label="delete">
            <ClearIcon />
        </IconButton>
        </div>
    );

    return (
        <Grid item md={12} xl={6}>
            <Card
                sx={{
                margin: "1rem",
                backgroundColor: "#f8f9fb",
                height: "150px",
                }}
                variant="outlined"
            >
                {isEditingRate ? (
                    <div className="flex flex-col items-center h-full">
                        {editActions}
                        <TextField
                        label="rate"
                        className="w-80"
                        type="text"
                        required
                        sx={{
                            backgroundColor: "white",
                            alignSelf: "center",
                            margin: "auto 0",
                        }}
                        onInput={(event) => {
                            const inputElement = event.target as HTMLInputElement;
                            inputElement.value = inputElement.value.replace(/[^0-9.]/g, "");
                            setEditedRate(inputElement.value);
                        }}
                        value={editedRate}
                        onChange={(event) => setEditedRate(event.target.value)}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <IconButton
                        sx={{ width: "fit-content", alignSelf: "end" }}
                        onClick={() => handleEditMode()}
                        aria-label="delete"
                        >
                        <EditIcon />
                        </IconButton>
                        <Typography
                        variant="h5"
                        component="div"
                        sx={{ alignSelf: "center", margin: "auto 0" }}
                        >
                        {selectedRateInfo?.rate}
                        </Typography>
                    </div>
                )}
            </Card>
        </Grid>
    );
};

export default RateForm;
