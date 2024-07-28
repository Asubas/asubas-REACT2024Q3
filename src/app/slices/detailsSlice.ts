import { createSlice } from '@reduxjs/toolkit';

const initialData: string = '';

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    initialData,
  },
  reducers: {
    setDetails: (state, action) => {
      state.initialData = action.payload;
    },
  },
});

export const { setDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
