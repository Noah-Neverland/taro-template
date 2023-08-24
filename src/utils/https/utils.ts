import Taro from '@tarojs/taro';
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage?.route || '';
  return url;
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl() as string;
  Taro.clearStorage();
  if (!path.includes('login')) {
    Taro.reLaunch({
      url: '/pages/login/index',
    });
  }
};
