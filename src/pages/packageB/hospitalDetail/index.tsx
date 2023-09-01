import Taro, { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import react, { useState } from 'react';
import { Button, Image, Popup, Skeleton, Empty } from '@antmjs/vantui';
import WxOpenWxApp from '@/components/WxOpenWxApp';
import Specialissts from '@/components/Specialissts';
import { GetHospitalInfo } from '@/api/hospital';
import './index.less';

export default function HospitalDetail() {
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>({});

  const router = useRouter();

  react.useEffect(() => {
    getData();
    Taro.removeStorageSync('Specialissts');
  }, []);

  // 获取医院详情
  const getData = async () => {
    try {
      const id = Number(router.params.id);
      const res: any = await GetHospitalInfo({ id });
      const specialtyDepartments = (!!res.specialtyDepartments && JSON.parse(res.specialtyDepartments).join('、')) || [];
      setDetail({ ...res, specialtyDepartments });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // 跳转外链
  const toOutSide = (url: string) => {
    // // 区分跳转医院还是地图
    if (!url) return false;
    window.location.href = url;
  };

  // 更多专家
  const toMoreSpecialisst = () => {
    // 保存更多专家信息
    Taro.setStorageSync('Specialissts', JSON.stringify(detail.doctors));
    Taro.navigateTo({ url: '/pages/packageB/specialissts/index' });
  };

  return (
    <Skeleton title row="12" loading={loading} animate>
      <View className="hDetail">
        <View className="hDetail-info bg-white">
          <View className="hDetail-info-logo">
            <Image width="100%" height="100%" fit="cover" src={detail.pic} />
          </View>
          <Text className="hDetail-info-title font-PM">{detail.name}</Text>
          <View className="hDetail-info-introduce">
            医院概况：{detail.remark}
            {detail?.remark?.length > 50 ? (
              <Text className="hDetail-info-introduce-more" onClick={() => setShow(true)}>
                查看简介
              </Text>
            ) : (
              ''
            )}
          </View>
          <View className="hDetail-info-feature">
            <Text className="font-bold text-black mr-4">特色科室</Text>
            <Text>{detail.specialtyDepartments}</Text>
          </View>
        </View>
        <View className="hDetail-specialisst">
          <View className="hDetail-specialisst-title flex justify-between">
            <Text className="font-bold text-black" style={{ fontSize: Taro.pxTransform(32) }}>
              知名专家
            </Text>
            {detail?.doctors?.length > 2 ? (
              <Text style={{ fontSize: Taro.pxTransform(28), color: '#94A4B7' }} onClick={toMoreSpecialisst}>
                更多
              </Text>
            ) : (
              ''
            )}
          </View>
          {!!detail?.doctors?.length ? (
            <View className="hDetail-specialisst-content">
              {detail.doctors.slice(0, 2).map((item: any, index: number) => (
                <Specialissts key={`${index}_${item.id}`} info={item} backgroundColor="rgba(224, 244, 244, 0.38)" />
              ))}
            </View>
          ) : (
            <Empty image="search" description="暂无专家数据" />
          )}
        </View>
        <View className="hDetail-footer">
          <View className="hDetail-footer-address mb-10" onClick={() => toOutSide(detail.addressUrl)}>
            {detail.address}
          </View>
          {detail.type === 1 ? (
            <View className="hDetail-footer-button">
              <Button round type="info" size="small">
                去挂号
              </Button>
              <WxOpenWxApp width={640} height={82} appid={detail.url} />
            </View>
          ) : (
            <View className="hDetail-footer-button" onClick={() => toOutSide(detail.url)}>
              <Button round type="info" size="small">
                去挂号
              </Button>
            </View>
          )}
        </View>
        <Popup show={show} position="bottom" closeable round onClose={() => setShow(false)}>
          <View className="popupIntroduce">
            <View className="popupIntroduce-title font-PM">医院简介</View>
            <View className="popupIntroduce-content">
              <View className="popupIntroduce-content-feature">
                <Text className="popupIntroduce-content-feature-title font-PM">特色科室</Text>
                <Text className="popupIntroduce-content-feature-main block my-2">{detail.specialtyDepartments}</Text>
              </View>
              <View className="popupIntroduce-content-int">
                <Text className="popupIntroduce-content-int-title font-PM">医院概况</Text>
                <Text className="popupIntroduce-content-int-main block my-2">{detail.remark}</Text>
              </View>
            </View>
          </View>
        </Popup>
      </View>
    </Skeleton>
  );
}
