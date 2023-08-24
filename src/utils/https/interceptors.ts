import Taro from '@tarojs/taro';
import { pageToLogin } from './utils';
import { HTTP_STATUS, HTTP_STATUS_TYPE } from './config';

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  Taro.showLoading({
    title: '加载中',
  });
  return chain
    .proceed(requestParams)
    .then((res: any) => {
      Taro.hideLoading();
      const { statusCode } = res;
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (statusCode === HTTP_STATUS.SUCCESS) {
        const { code, data: result, message } = res.data || {};

        const hasSuccess = res.data && Reflect.has(res.data, 'code') && code === HTTP_STATUS.SUCCESS;

        if (hasSuccess) return result;

        let timeoutMsg = '';
        switch (code) {
          case HTTP_STATUS.AUTHENTICATE:
            timeoutMsg = HTTP_STATUS_TYPE[code];
            Taro.setStorageSync('Authorization', '');
            pageToLogin();
            break;
          default:
            if (message) timeoutMsg = message;
            break;
        }
        return Promise.reject({ desc: timeoutMsg || '接口异常' });
      } else {
        return Promise.reject({
          desc: HTTP_STATUS_TYPE[statusCode] || '服务器异常',
        });
      }
    })
    .catch((error) => {
      Taro.hideLoading();
      return Promise.reject(error);
    });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [customInterceptor];

export default interceptors;
