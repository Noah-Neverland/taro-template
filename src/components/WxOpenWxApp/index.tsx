// @ts-nocheck
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import react, { ReactNode, useRef } from 'react';
import WeChat from '@/utils/weChat';

interface WxOpenWxAppProps {
  width?: number | string;
  height?: number | string;
  backgroundImg?: string;
  path?: string;
  children?: ReactNode;
  appid?: string;
  style?: any;
}

const WxOpenWxApp = (props: WxOpenWxAppProps) => {
  const ref = useRef<HTMLInputElement>();

  react.useEffect(() => {
    return () => {
      ref.current?.removeEventListener('ready', readyHandel);
      ref.current?.removeEventListener('launch', launchHandel);
      ref.current?.removeEventListener('error', errorHandel);
    };
  }, []);

  react.useLayoutEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        (async () => {
          await WeChat.getInstance();
          // 这里是签名逻辑
        })();
      }, 0);
    }
    ref.current?.removeEventListener('ready', readyHandel);
    ref.current?.removeEventListener('launch', launchHandel);
    ref.current?.removeEventListener('error', errorHandel);
    ref.current?.addEventListener('ready', readyHandel);
    ref.current?.addEventListener('launch', launchHandel);
    ref.current?.addEventListener('error', errorHandel);
  }, [ref.current]);

  const launchHandel = (e: any) => {
    console.log('跳转小程序成功：', e.detail);
  };

  const errorHandel = (e: any) => {
    console.log('跳转小程序失败：', e.detail);
  };

  const readyHandel = () => {
    console.log('跳转小程序准备完成');
  };

  return (
    <View
      style={
        props.style || {
          width: Taro.pxTransform(props.width),
          height: Taro.pxTransform(props.height),
          background: props.backgroundImg ? `url("${props.backgroundImg}") no-repeat center center / 100% 100%` : '',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
        }
      }
    >
      <wx-open-launch-weapp
        ref={ref}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        appid={props.appid}
        username={props.username}
        env-version={props.envversion}
        path={props.path}
      >
        <script type="text/wxtag-template">
          <button
            style={{
              width: parseFloat(Taro.pxTransform(props.width)) * parseFloat(getComputedStyle(document.body).fontSize),
              height: parseFloat(Taro.pxTransform(props.height)) * parseFloat(getComputedStyle(document.body).fontSize),
              background: 'none',
              border: 'none',
              outline: 'none',
              position: 'relative',
              margin: 0,
              padding: 0,
              left: 0,
              right: 0,
              opacity: 0,
            }}
          >
            {props.children}
          </button>
        </script>
      </wx-open-launch-weapp>
    </View>
  );
};
export default WxOpenWxApp;
