import { combineReducers } from 'redux';
import appSlice from './appSlice';
import userSlice from './userSlice';
import genreConfigSlice from './genreConfigSlice';

export default combineReducers({ appSlice, userSlice, genreConfigSlice });
