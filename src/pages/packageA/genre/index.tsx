import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Popup, Dialog, Image } from '@antmjs/vantui';
import { useAppSelector } from '@/hooks/store';
import { RADIO_TYPE_OPTIONS } from '@/constants';
import CNotice from '@/components/CNotice';
import './index.less';

const ADialog = Dialog.createOnlyDialog();

export default function Genre() {
  const [typeStatus, setTypeStatus] = useState<string | number>(1); // 当前选择的申请类型
  const [close, setClose] = useState<boolean>(false); // 是否关闭体检

  const allConfig = useAppSelector((state) => state.genreConfigSlice.allConfig);

  // 预约须知
  const handleClick = (e: any, type: number | string) => {
    e.stopPropagation();
    setTypeStatus(type);
    setClose(true);
  };

  // 关闭体检的提示公告
  const onShowNotice = (info: any) => {
    ADialog.confirm({
      title: '体检已关闭',
      message: info.content,
      confirmButtonText: '我知道了',
    });
  };

  // 跳转申请页面
  const toApply = (type: number) => {
    // 如果当前选择的类型已关闭体检 弹出后台配置的提示公告内容
    if (allConfig[type].status === 2) return onShowNotice(allConfig[type]);
    // 跳转之前清除editInfo
    Taro.removeStorageSync('editInfo');
    // 跳转到预约申请页面
    Taro.navigateTo({ url: `/pages/packageA/apply/index?applyType=${type}` });
  };

  return (
    <View className="genre">
      <View className="genre-title">
        <Text>请选择居民类型</Text>
      </View>
      <View className="genre-items">
        {RADIO_TYPE_OPTIONS.map((item: any, index: number) => (
          <View className="genre-items-main" key={`${index}_${item.value}`} onClick={() => toApply(item.value)}>
            <View className="genre-items-main-left">
              <Image width="100%" height="100%" fit="cover" src={item.icon} />
            </View>
            <View className="genre-items-main-right">
              <View className="genre-items-main-right-title">{item.title}</View>
              <View className="genre-items-main-right-subtitle">{item.subtitle}</View>
              <View className="genre-items-main-right-popup" onClick={(event) => handleClick(event, item.value)}>
                《预约须知》
              </View>
            </View>
          </View>
        ))}
      </View>
      <ADialog />
      {/* 预约须知 */}
      <Popup show={close} round onClose={() => setClose(false)}>
        <CNotice content={allConfig[typeStatus]?.remark} setClose={setClose} />
      </Popup>
    </View>
  );
}
