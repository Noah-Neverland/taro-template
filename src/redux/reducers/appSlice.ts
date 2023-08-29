import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  wxEntryUrl: string;
}

const initialState: AppState = {
  wxEntryUrl: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setWxEntryUrl: (state, action: PayloadAction<string>) => {
      state.wxEntryUrl = action.payload;
    },
  },
});

export const { setWxEntryUrl } = appSlice.actions;
export default appSlice.reducer;
