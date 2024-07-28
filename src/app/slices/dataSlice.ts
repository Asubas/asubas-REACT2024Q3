import { createSlice } from '@reduxjs/toolkit';
import { IDogItem } from '../../interfaces/dogInterface';

const initialData: IDogItem[] = [];

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    initialData,
  },
  reducers: {
    setData: (state, action) => {
      state.initialData = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
