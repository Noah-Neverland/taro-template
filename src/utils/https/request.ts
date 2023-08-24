import Taro from '@tarojs/taro';
import { cloneDeep } from 'lodash-es';
import { ContentTypeEnum } from '@/enums/httpEnum';
import getBaseUrl from './baseUrl';
import interceptors from './interceptors';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface AxiosRequestConfig {
  url: string;
  data?: any;
  header?: any;
  timeout?: number;
  method?: Method;
}

const BASE_URL = getBaseUrl();

// 添加拦截器
interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

class VAxios {
  private readonly options: any;

  constructor(options: any) {
    this.options = options;
  }

  request(config: AxiosRequestConfig) {
    let conf = { ...this.options, ...cloneDeep(config) };
    conf.url = `${BASE_URL}${config.url}`;
    return new Promise((resolve) => {
      Taro.request(conf)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          Taro.showToast({
            title: err.message || err.desc,
            duration: 3000,
            icon: 'none',
          });
        });
    });
  }

  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'GET' });
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'POST' });
  }

  put(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'PUT' });
  }

  delete(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'DELETE' });
  }
}

function createAxios() {
  return new VAxios({
    method: 'GET',
    timeout: 10 * 1000,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
  });
}

export const defHttp = createAxios();
