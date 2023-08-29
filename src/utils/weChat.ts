import Taro from '@tarojs/taro';
import wx from 'weixin-js-sdk';
import { GetSign } from '@/api/index';

const WeChat = {
  getInstance: async () => {
    const wxEntryUrl = Taro.getStorageSync('wxEntryUrl');
    const res: any = await GetSign({ url: wxEntryUrl });
    const { appid, noncestr, sign, timestamp } = res;
    wx.config({
      debug: false,
      appId: appid,
      timestamp,
      nonceStr: noncestr,
      signature: sign,
      // 这里是把所有的方法都写出来了 如果只需要一个方法可以只写一个
      jsApiList: ['scanQRCode', 'getLocation', 'wx-open-launch-weapp', 'chooseImage', 'previewImage'],
      openTagList: ['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
    });
  },
};

export default WeChat;
