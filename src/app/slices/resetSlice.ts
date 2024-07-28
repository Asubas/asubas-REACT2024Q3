import { createSlice } from '@reduxjs/toolkit';

const isReset: boolean = true;

const resetSlice = createSlice({
  name: 'pagination',
  initialState: {
    isReset,
  },
  reducers: {
    setIsReset: (state, action) => {
      state.isReset = action.payload;
    },
  },
});

export const { setIsReset } = resetSlice.actions;
export default resetSlice.reducer;
