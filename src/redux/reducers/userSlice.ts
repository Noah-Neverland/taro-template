import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  name: string;
  phone: string | number;
  role?: string;
}

interface UserState {
  userInfo: UserInfo;
}

const initialState: UserState = {
  userInfo: {
    name: 'hss',
    phone: '18019937008',
    role: 'admin',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
