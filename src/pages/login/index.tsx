import { View, Text } from '@tarojs/components';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { Icon } from '@antmjs/vantui';
import { LoginApi } from '@/api/login';
import { useAppDispatch } from '@/hooks/store';
import { setUser } from '@/redux/reducers/userSlice';

import './index.less';

export default function Login() {
  const {
    params: { code },
  } = useRouter();

  const dispatch = useAppDispatch();

  useDidShow(() => {
    onWXlogin();
  });

  // 调用微信授权登录
  async function onWXlogin() {
    // 获取微信授权返回的code
    if (code) {
      // 调用登录接口
      const res: any = await LoginApi({ code });
      if (!res) return false;
      const {
        userThird: { openid, id },
      } = res;
      Taro.setStorageSync('Authorization', `${openid}_${id}`);
      dispatch(setUser(res.userThird));
      Taro.reLaunch({ url: '/pages/index/index' });
    } else {
      wxLogin();
    }
  }

  // 调用微信授权登录
  function wxLogin() {
    const domain = document.domain;
    const port = window.location.port ? `:${window.location.port}` : '';
    const http = 'https:' == document.location.protocol ? 'https://' : 'http://';
    const appId = process.env.NODE_ENV === 'development' ? 'wx5eff61891fd66104' : 'wxba6188a474b6a9de'; // 微信公众号平台测试appId
    const scope = 'snsapi_userinfo';
    const url = encodeURIComponent(`${http}${domain}${port}/${process.env.TARO_APP_H5_BASENAME}/login`);
    window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`);
  }

  return (
    <View className="login flex items-center justify-center h-full">
      <View className="text-center" onClick={() => wxLogin()}>
        <Icon name="wechat" size={Taro.pxTransform(128)} className="icon" color="#00ac84"></Icon>
        <Text className="block text-gray-400">微信授权登录</Text>
      </View>
    </View>
  );
}
