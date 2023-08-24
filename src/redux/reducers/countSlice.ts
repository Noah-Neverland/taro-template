import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  current: number;
}

const initialState: CountState = {
  current: 1,
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { setCurrent } = countSlice.actions;
export default countSlice.reducer;
