import { createSlice } from '@reduxjs/toolkit';

const errorHandlerSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => null,
  },
});

export const { setError, clearError } = errorHandlerSlice.actions;
export default errorHandlerSlice.reducer;