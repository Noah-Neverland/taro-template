import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id: number | undefined;
  appId: string;
  headimgurl: string;
  nickname: string;
  openid: string;
  [key: string]: any;
}

interface UserState {
  userInfo: UserInfo;
}

const initialState: UserState = {
  userInfo: {
    id: undefined,
    appId: '',
    headimgurl: '',
    nickname: '',
    openid: '',
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
