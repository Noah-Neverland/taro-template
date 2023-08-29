import Taro from '@tarojs/taro';

type RouteProps = {
  children?: React.ReactNode;
};
const AuthRoute: React.FC<RouteProps> = ({ children }) => {
  if (Taro.env.TARO_ENV === 'h5') {
    const currentUrl = window.location.href.split('#')[0];
    Taro.setStorageSync('wxEntryUrl', currentUrl);
  }

  return <>{children}</>;
};

export default AuthRoute;
