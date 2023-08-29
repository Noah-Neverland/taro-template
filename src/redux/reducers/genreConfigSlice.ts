import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreConfigState {
  allConfig: { [key: string]: any }; // 所有体检类型的配置信息
  config: { [key: string]: any }; // 选择的配置信息
  hospitals: Array<any>; // 医院信息
  communitys: Array<any>; // 社区信息
}

const initialState: GenreConfigState = {
  allConfig: {},
  config: {},
  hospitals: [],
  communitys: [],
};

export const genreConfigSlice = createSlice({
  name: 'genreConfig',
  initialState,
  reducers: {
    setAllConfig: (state, action: PayloadAction<any>) => {
      state.allConfig = action.payload;
    },
    setConfig: (state, action: PayloadAction<any>) => {
      state.config = action.payload;
    },
    setHospitals: (state, action: PayloadAction<any>) => {
      state.hospitals = action.payload;
    },
    setCommunitys: (state, action: PayloadAction<any>) => {
      state.communitys = action.payload;
    },
  },
});

export const { setAllConfig, setConfig, setHospitals, setCommunitys } = genreConfigSlice.actions;
export default genreConfigSlice.reducer;
