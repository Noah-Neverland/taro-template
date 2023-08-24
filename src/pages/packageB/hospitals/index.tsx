import Taro from '@tarojs/taro';
import { View, Text, ITouchEvent } from '@tarojs/components';
import react, { useState } from 'react';
import { Button, Search, Image } from '@antmjs/vantui';
import { GetHospital } from '@/api/hospital';
import './index.less';

export default function Hospital() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  react.useEffect(() => {
    getData();
  }, [search]);

  // 获取列表数据
  const getData = async () => {
    const res: any = await GetHospital({ name: search });
    setData(res);
  };

  // 跳转外链
  const toOutSide = (e: ITouchEvent, item: any, type: string) => {
    e.stopPropagation();
    // // 区分跳转医院还是地图
    if (!item[type]) return false;
    window.location.href = item[type];
  };

  return (
    <View className="hospitals">
      <View className="hospitals-search">
        <Search shape="round" onSearch={(e: ITouchEvent) => setSearch(e.detail)} onClear={() => setSearch('')} />
      </View>
      <>
        {data.map((item, index) => (
          <View className="hospitals-content" key={`${index}_${item.id}`}>
            <View className="hospitals-content-head flex items-center">
              <View className="hospitals-content-head-left">
                <Image radius={Taro.pxTransform(10)} width="100%" height="100%" fit="cover" src={item.pic} />
              </View>
              <View className="hospitals-content-head-right">
                <View className="hospitals-content-head-right-title font-PM">{item.name}</View>
              </View>
            </View>
            <View className="hospitals-content-footer flex items-center justify-between">
              <View className="hospitals-content-footer-left" onClick={(e) => toOutSide(e, item, 'addressUrl')}>
                <Text>{item.address || '--'}</Text>
              </View>
              <View className="hospitals-content-footer-right" onClick={(e) => toOutSide(e, item, 'url')}>
                <Button type="info" size="small">
                  去挂号
                </Button>
              </View>
            </View>
          </View>
        ))}
      </>
    </View>
  );
}
