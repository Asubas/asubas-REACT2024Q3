import { createSlice } from '@reduxjs/toolkit';

const isResult: boolean = false;

const searchResult = createSlice({
  name: 'pagination',
  initialState: {
    isResult,
  },
  reducers: {
    setIsSearchResult: (state, action) => {
      state.isResult = action.payload;
    },
  },
});

export const { setIsSearchResult } = searchResult.actions;
export default searchResult.reducer;
