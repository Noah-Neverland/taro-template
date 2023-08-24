import { combineReducers } from 'redux';
import userSlice from './userSlice';
import countSlice from './countSlice';

export default combineReducers({ countSlice, userSlice });
