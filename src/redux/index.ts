// 使用rtk(reduxToolKit)官方推荐写法，降低代码复制性，其中集成createAsyncThunk类似redux-thunk可进行接口异步调用
import { configureStore } from '@reduxjs/toolkit';
//配置数据的持久化效果
import { persistReducer, persistStore } from 'redux-persist';
//导入需要配置的数据源，可以选择，storage，cookie,session等
import storage from './redux-persist-taro-storage/storage';
import reducer from './reducers';

//定义配置的信息
const persitConfig = {
  key: 'rootStreet',
  storage,
  // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
  //   blacklist: ['ll']
};
//创建持久化的配置persist的信息
const persist_reducers = persistReducer(persitConfig, reducer);

//创建存储对象并且抛出对象
const store = configureStore({
  reducer: persist_reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
