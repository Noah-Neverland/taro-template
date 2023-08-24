import Taro from '@tarojs/taro';

export default function setBarTitle(title: string) {
  Taro.setNavigationBarTitle({
    title,
  });
}
