import { createSlice } from '@reduxjs/toolkit';
import { IDogItem } from '../../interfaces/dogInterface';

const initFavoriteArr: IDogItem[] = [];
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    initFavoriteArr,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.initFavoriteArr.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.initFavoriteArr = state.initFavoriteArr.filter((item) => item.id !== action.payload.id);
    },
    resetStore: (state) => {
      state.initFavoriteArr.length = 0;
    },
  },
});

export const { addFavorite, removeFavorite, resetStore } = favoriteSlice.actions;
export default favoriteSlice.reducer;
