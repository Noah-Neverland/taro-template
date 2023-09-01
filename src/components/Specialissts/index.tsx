import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Tag, Image } from '@antmjs/vantui';
import './index.less';

interface Info {
  id: number;
  name: string;
  pic: string;
  title: string;
  department: string;
  label: string;
}

type Props = {
  info: Info;
  backgroundColor?: string;
};

export default function Specialissts({ info, backgroundColor }: Props) {
  const tags: any = (!!info.label && JSON.parse(info.label)) || [];

  return (
    <View className="specialisst flex items-center" style={{ backgroundColor }}>
      <View className="specialisst-image">
        <Image width="100%" height="100%" fit="cover" src={info.pic} />
      </View>
      <View className="specialisst-info">
        <View className="specialisst-info-title">
          <Text style={{ fontSize: Taro.pxTransform(30), fontWeight: 'bold', marginRight: '6px' }}>{info.name}</Text>
          <Text style={{ fontSize: Taro.pxTransform(24), color: '#647288' }}>{info.title}</Text>
        </View>
        <View className="specialisst-info-subtitle">{info.department}</View>
        <View className="specialisst-info-tag">
          {tags.map((item: string, index: number) => (
            <Tag key={`${index}_${info.id}_tag`} plain type="primary" style={{ marginRight: '4px', borderRadius: '2px' }}>
              {item}
            </Tag>
          ))}
        </View>
      </View>
    </View>
  );
}
