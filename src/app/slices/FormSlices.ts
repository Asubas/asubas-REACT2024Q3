import { createSlice } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: boolean;
  termsAccepted: boolean;
  profilePicture: string | null;
  country: string;
}

const initialState = {
  data: [] as FormData[],
};

const formSlice = createSlice({
  name: 'formReducer',
  initialState,
  reducers: {
    formReducer: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { formReducer } = formSlice.actions;
export default formSlice.reducer;
