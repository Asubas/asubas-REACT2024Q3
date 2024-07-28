import { createSlice } from '@reduxjs/toolkit';

const isPagination: boolean = true;

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    isPagination,
  },
  reducers: {
    setIsPagination: (state, action) => {
      state.isPagination = action.payload;
    },
  },
});

export const { setIsPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
