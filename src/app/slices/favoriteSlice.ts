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
      state.initFavoriteArr = state.initFavoriteArr.filter((item) => item !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
