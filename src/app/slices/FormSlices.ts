import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [{}, {}],
};

const formSlice = createSlice({
  name: 'formReducer',
  initialState,
  reducers: {
    regularFormReducer: (state, action) => {
      state.data[0] = action.payload;
    },
    hookFormReducer: (state, action) => {
      state.data[1] = action.payload;
    },
  },
});

export const { regularFormReducer, hookFormReducer } = formSlice.actions;
export default formSlice.reducer;
