import { useState } from 'react';
import {
  TextField,
  Alert,
  Button,
  Box,
  Modal,
  IconButton,
  Snackbar,
} from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import { useWalletForm } from './useWalletForm';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 2,
};

const WalletForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const  {
    handleAddWallet,
    addressError,
    address,
    setAddress,
    successMessage,
    setSuccessMessage
  } = useWalletForm({setIsModalOpen})



  const successMessageContainer = successMessage && (
    <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)} anchorOrigin={{vertical:'top', horizontal:'right'}}>
      <Alert  onClose={() => setSuccessMessage(false)} severity="success">Wallet added successfully!</Alert>
    </Snackbar>
  )

  const formModal = (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => setIsModalOpen(false)}>
          <ClearIcon />
        </IconButton>
        <div className="flex justify-center items-center flex-col gap-8">
          <h3>Add wallet</h3>
          <TextField
            label="address"
            className="w-80"
            type="text"
            required
            helperText={addressError && "Please enter a valid address."}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            error={addressError}
          />
          <Button variant="contained" onClick={() => handleAddWallet()}>
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );

  return (
    <>
      {successMessageContainer}
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>Add Wallet</Button>
      {formModal}
    </>
  );
}

export default WalletForm;
