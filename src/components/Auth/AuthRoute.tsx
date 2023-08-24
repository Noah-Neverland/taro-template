import Taro from '@tarojs/taro';
// import { history } from '@tarojs/router';
// import { useEffect, useMemo } from 'react';
import { getCurrentPageUrl } from '@/utils/https/utils';

type RouteProps = {
  children?: React.ReactNode;
};

const loginRoute = '/pages/login/index';
const indexRoute = '/pages/index/index';

const allowList = ['pages/login/index', '/mtStreet/login'];

// const allowList = (list: string[]) => {
//   return useMemo(() => {
//     return list.map((item: string) => {
//       return `${process.env.TARO_APP_H5_BASENAME}${item}`;
//     });
//   }, []);
// };

const AuthRoute: React.FC<RouteProps> = ({ children }) => {
  let url = getCurrentPageUrl();
  if (url) {
    const token = true;
    if (token) {
      // 有 token 的状态下禁止用户回到登录页，重定向到首页
      if (url.includes('login')) {
        Taro.redirectTo({ url: indexRoute });
      }
    } else {
      // 无 token 的状态下，如果要跳转的路由是白名单中的路由，正常跳转
      if (!allowList.includes(url)) {
        Taro.redirectTo({ url: loginRoute });
      }
    }
  }

  // useEffect(() => {
  //   const unblock = history.block((tx) => {
  //     const url = tx.location.pathname;
  //     const token = true;
  //     if (token) {
  //       // 有 token 的状态下禁止用户回到登录页，重定向到首页
  //       if (url === h5LoginRoute) {
  //         Taro.redirectTo({ url: indexRoute });
  //       } else {
  //         unblock();
  //         tx.retry();
  //       }
  //     } else {
  //       // 无 token 的状态下，如果要跳转的路由是白名单中的路由，正常跳转
  //       if (allowLists.includes(url)) {
  //         // 无 token 且非白名单路由，重定向至登录页
  //         unblock();
  //         tx.retry();
  //       } else {
  //         Taro.redirectTo({ url: loginRoute });
  //       }
  //     }
  //   });
  //   return () => unblock();
  // });

  return <>{children}</>;
};

export default AuthRoute;
