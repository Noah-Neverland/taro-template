import Taro from '@tarojs/taro';
import { View, Text, ITouchEvent } from '@tarojs/components';
import react, { useState, FC, memo, useRef } from 'react';
import { useReactive } from '@/hooks/core';
import { Button, Search, Image, DropdownMenu, DropdownItem, Empty, Tag, IDropdownItemInstance } from '@antmjs/vantui';
import { GetHospital, GetDict } from '@/api/hospital';
import WxOpenWxApp from '@/components/WxOpenWxApp';
import './index.less';

// 特色科室标签 做多展示三个
const Specialty: FC<any> = memo(({ info }) => {
  const datas = (!!info && JSON.parse(info)) || [];
  return datas.slice(0, 3).map((item: any, index: number) => (
    <Tag key={`${index}_h_tag`} plain type="primary" style={{ borderRadius: '2px', marginRight: '4px' }}>
      {item}
    </Tag>
  ));
});

const Items: FC<any> = memo(({ data }) => {
  // 跳转详情页面
  const toDetail = (item: any) => {
    Taro.navigateTo({ url: `/pages/packageB/hospitalDetail/index?id=${item.id}` });
  };

  // 跳转外链
  const toOutSide = (e: ITouchEvent, item: any, type: string) => {
    e.stopPropagation();
    // // 区分跳转医院还是地图
    if (!item[type]) return false;
    window.location.href = item[type];
  };

  return data.map((item, index) => (
    <View className="hospitals-content" key={`${index}_${item.id}`}>
      <View className="hospitals-content-head flex items-center" onClick={() => toDetail(item)}>
        <View className="hospitals-content-head-left">
          <Image radius={Taro.pxTransform(10)} width="100%" height="100%" fit="cover" src={item.pic} />
        </View>
        <View className="hospitals-content-head-right">
          <View className="hospitals-content-head-right-title font-PM">{item.name}</View>
          {!!item.level ? (
            <Tag type="primary" style={{ marginRight: '4px', borderRadius: '2px' }}>
              {item.level}
            </Tag>
          ) : (
            ''
          )}
          {!!item.specialtyDepartments ? <Specialty info={item.specialtyDepartments} /> : ''}
        </View>
      </View>
      <View className="hospitals-content-footer flex items-center justify-between">
        <View className="hospitals-content-footer-left" onClick={(e) => toOutSide(e, item, 'addressUrl')}>
          <Text>{item.address || '--'}</Text>
        </View>
        {item.type === 1 ? (
          <View className="hospitals-content-footer-right">
            <Button type="info" size="small">
              去挂号
            </Button>
            <WxOpenWxApp width={158} height={60} appid={item.url} />
          </View>
        ) : (
          <View className="hospitals-content-footer-right" onClick={(e) => toOutSide(e, item, 'url')}>
            <Button type="info" size="small">
              去挂号
            </Button>
          </View>
        )}
      </View>
    </View>
  ));
});

export default function Hospital() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const state = useReactive<any>({
    region: '',
    level: '',
    specialtyDepartments: '',
    regionOption: [],
    levelOption: [],
    specialtyDepartmentsOption: [],
  });
  const dropdownMenuRef = useRef<IDropdownItemInstance>(null);

  react.useEffect(() => {
    getData();
  }, [state.region, state.level, state.specialtyDepartments]);

  react.useEffect(() => {
    getDict();
  }, []);

  // 搜索框输入值后调用
  // const onChangeSearch = useDebounceFn((v) => setSearch(v));

  // 获取列表数据
  const getData = async () => {
    const params = { name: search, region: state.region, level: state.level, specialtyDepartments: state.specialtyDepartments };
    const res: any = await GetHospital(params);
    setData(res);
  };

  // 获取区域等级科室信息
  const getDict = async () => {
    const res: any = await GetDict();
    let regions = [{ text: '区域', value: '' }];
    let levels = [{ text: '等级', value: '' }];
    let specialtyDepartments = [{ text: '特色科室', value: '' }];
    res.forEach((item: any) => {
      if (item.type === 1) regions.push({ text: item.name, value: item.name });
      if (item.type === 2) levels.push({ text: item.name, value: item.name });
      if (item.type === 3) specialtyDepartments.push({ text: item.name, value: item.name });
    });
    Object.assign(state, { regionOption: regions, levelOption: levels, specialtyDepartmentsOption: specialtyDepartments });
  };

  return (
    <View className="hospitals">
      <View className="hospitals-search">
        <Search
          placeholder="搜索医院"
          onFocus={() => dropdownMenuRef?.current?.toggle(false)}
          onBlur={(e: ITouchEvent) => setSearch(e.detail)}
          renderAction={<View onClick={getData}>搜索</View>}
        />
        {/* DropdownMenu */}
        <DropdownMenu activeColor="#4890ff" closeOnClickOutside>
          <DropdownItem
            ref={dropdownMenuRef}
            popupStyle={{ maxHeight: '60%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
            value={state.region}
            options={state.regionOption}
            onChange={(v) => (state.region = v)}
          />
          <DropdownItem
            ref={dropdownMenuRef}
            popupStyle={{ maxHeight: '60%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
            value={state.level}
            options={state.levelOption}
            onChange={(v) => (state.level = v)}
          />
          <DropdownItem
            ref={dropdownMenuRef}
            popupStyle={{ maxHeight: '60%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
            value={state.specialtyDepartments}
            options={state.specialtyDepartmentsOption}
            onChange={(v) => (state.specialtyDepartments = v)}
          />
        </DropdownMenu>
      </View>
      <>{!!data.length ? <Items data={data} /> : <Empty image="search" description="暂无医院信息" />}</>
    </View>
  );
}
