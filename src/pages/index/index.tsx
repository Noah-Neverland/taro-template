import Taro, { useDidShow } from '@tarojs/taro';
import { useState, memo, FC } from 'react';
import { View, Text } from '@tarojs/components';
import { Empty, Image } from '@antmjs/vantui';
import { useAppDispatch } from '@/hooks/store';
import { STATUS_TYPE, APPLY_INFO_ARRAYS, SEX_TYPE } from '@/constants';
import { setAllConfig, setHospitals, setCommunitys } from '@/redux/reducers/genreConfigSlice';
import { GetBooking, GetConfig, GetHospital, GetCommunity } from '@/api/index';
import applyImg from '@/assets/images/home/apply.jpg';
import './index.less';

type Props = {
  data: any;
};

const Items: FC<Props> = memo(({ data }) => {
  // 跳转到申请详情页面
  const toDetail = async (item: any) => {
    Taro.navigateTo({
      url: `/pages/packageA/apply/index?applyType=${item.type}&id=${item.id}`,
    });
  };

  return data.map((item: any, index: number) => (
    <View className="home-main-item" key={`${item.id}_${index}`}>
      <View className="home-main-item-head flex justify-between items-baseline mx-4 py-3">
        <View className="home-main-item-head-left">
          <Text className="home-main-item-head-left-name font-PM">{item.name}</Text>
          <Text className="home-main-item-head-left-sex">{SEX_TYPE[item.sex] || '--'}</Text>
          <Text className="home-main-item-head-left-split">|</Text>
          <Text className="home-main-item-head-left-age">{item.age}岁</Text>
        </View>
        <View className="home-main-item-head-right">
          <Text>{STATUS_TYPE[item.status]}</Text>
        </View>
      </View>
      <View className="home-main-item-content px-4 py-4" onClick={() => toDetail(item)}>
        {APPLY_INFO_ARRAYS.map((childItem: any) => (
          <View className="content" key={`${childItem.field}_${item.id}`}>
            <Text className="label">{childItem.title === '申请时间' && item.status !== 1 ? '审核时间' : childItem.title}</Text>
            <Text className="value">{childItem.field === 'applyTime' && item.status !== 1 ? item['auditTime'] : item[childItem.field] || '--'}</Text>
          </View>
        ))}
      </View>
    </View>
  ));
});

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  useDidShow(() => {
    try {
      // 判断有无登录
      const Authorization = Taro.getStorageSync('Authorization');
      if (Authorization) {
        getData();
        getConfig();
        getCommunity();
        getHospital();
      } else {
        Taro.redirectTo({ url: '/pages/login/index' });
      }
    } catch (error) {
      Taro.showToast({ title: error.message || error });
    }
  });

  // 获取申请记录
  const getData = async () => {
    const res: any = await GetBooking();
    if (!res) return false;
    if (!res.length) return toGenre();
    setData(res);
  };

  // 获取配置信息
  const getConfig = async () => {
    const res: any = await GetConfig();
    let obj = {};
    res.forEach((item: any) => {
      obj[item.type] = item;
    });
    dispatch(setAllConfig(obj));
  };

  // 获取社区信息
  const getCommunity = async () => {
    const res: any = await GetCommunity();
    let arr = [];
    arr = res.map((item: any) => {
      return {
        value: item.id,
        text: item.name,
      };
    });
    dispatch(setCommunitys(arr));
  };

  // 医院信息
  const getHospital = async () => {
    const res: any = await GetHospital();
    let arr = [];
    arr = res.map((item: any) => {
      return {
        value: item.id,
        text: item.name,
      };
    });
    dispatch(setHospitals(arr));
  };

  // 跳转到选择居民类型的页面
  const toGenre = () => {
    Taro.navigateTo({ url: '/pages/packageA/genre/index' });
  };

  return (
    <>
      <View className="home">
        <View className="home-head">
          <Image width="100%" height="100%" fit="contain" src={applyImg} onClick={() => toGenre()} />
        </View>
        <View className="home-main">{!!data.length ? <Items data={data} /> : <Empty description="暂无记录" />}</View>
      </View>
    </>
  );
}
