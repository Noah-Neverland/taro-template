import 'uno.css';
import { PropsWithChildren } from 'react';
import Taro from '@tarojs/taro';
import VConsole from 'vconsole';
import { Provider } from 'react-redux';
import AuthRoute from '@/components/Auth/AuthRoute'; // 模拟路由守卫
import { PersistGate } from 'redux-persist/lib/integration/react';
import { isPc } from '@/utils/is';
import { store, persistor } from './redux';
import './utils/h5PxToRem';
import './app.less';

if (Taro.env.TARO_ENV === 'h5' && process.env.TARO_APP_BUILD_ENV === 'test' && !isPc()) new VConsole();

function App({ children }: PropsWithChildren<any>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthRoute>{children}</AuthRoute>
      </PersistGate>
    </Provider>
  );
}

export default App;
