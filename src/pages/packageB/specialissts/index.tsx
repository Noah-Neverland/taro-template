import Taro from '@tarojs/taro';
import { useMemo } from 'react';
import { View } from '@tarojs/components';
import Specialissts from '@/components/Specialissts';
import './index.less';

export default function Specialisst() {
  const data = useMemo(() => {
    return (Taro.getStorageSync('Specialissts') && JSON.parse(Taro.getStorageSync('Specialissts'))) || [];
  }, []);

  return (
    <View className="m-4">
      {data.map((item: any, index: number) => (
        <Specialissts key={`${index}_sts`} info={item} />
      ))}
    </View>
  );
}
