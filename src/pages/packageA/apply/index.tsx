import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { useRef, FC, useState, useContext, createContext } from 'react';
import { View, Text } from '@tarojs/components';
import { Icon, Button, Toast, Image } from '@antmjs/vantui';
import setBarTitle from '@/utils/setBarTitle/set_bar_title';
import { APPLY_TITLE, APPLY_DOCUMENT_TITLE } from '@/constants';
import { BasicForm, ReserveForm } from '@/components/CApplyForm';
import { GetConfig, AddBooking, GetBookingDetail } from '@/api/index';
import './index.less';

type ContextValueProps = {
  applyType: string | number | undefined;
  isDetail: boolean;
  detailInfo: any;
  auditStatus: string | number;
  config: object;
};

const ContextValue = createContext<ContextValueProps>({ applyType: 1, isDetail: false, detailInfo: {}, auditStatus: 1, config: {} });

const AToast = Toast.createOnlyToast();

// 表单申请
const ApplyForm: FC<any> = () => {
  const parentValue = useContext(ContextValue);
  const basicInfoRef = useRef<any>(null);
  const reserveRef = useRef<any>(null);
  const reserveSecondRef = useRef<any>(null);

  const { applyType, isDetail, detailInfo, auditStatus, config } = parentValue;
  const { firstHospital, firstTime, secondHospital, secondTime, choseHospital, choseTime } = detailInfo;

  const firstForm = { hospital: auditStatus === 2 ? choseHospital : firstHospital, date: auditStatus === 2 ? choseTime : firstTime };
  const secondForm = { hospital: secondHospital, date: secondTime };

  // 提交操作
  const onSubmit = async () => {
    // 区分是企业退休 还是 65周岁申请
    let params: any = {};
    if (applyType === '1') {
      const [basicInfo, reserveFirstInfo, reserveSecondInfo] = await Promise.all([
        basicInfoRef.current.onSubmit(),
        reserveRef.current.onSubmit(),
        reserveSecondRef.current.onSubmit(),
      ]);
      params = {
        ...basicInfo,
        firstId: reserveFirstInfo.hospitalName,
        firstTime: reserveFirstInfo.booking,
        secondId: reserveSecondInfo.hospitalName,
        secondTime: reserveSecondInfo.booking,
        type: applyType,
      };
      // 判断两次选择的医院是否相同
      if (reserveFirstInfo.hospitalName === reserveSecondInfo.hospitalName) return AToast.show('两次选择的医院相同');
    } else {
      const [basicInfo, reserveInfo] = await Promise.all([basicInfoRef.current.onSubmit(), reserveRef.current.onSubmit()]);
      params = { ...basicInfo, firstId: reserveInfo.hospitalName, firstTime: reserveInfo.booking, type: applyType };
    }
    // 调用接口
    await AddBooking(params);
    // 提交成功跳转到申请记录列表页面
    Taro.reLaunch({ url: '/pages/index/index' });
  };

  // 重新预约
  const onReschedule = () => {
    Taro.navigateTo({ url: '/pages/packageA/genre/index' });
  };

  return (
    <>
      {/* 基础信息 */}
      <BasicForm bRef={basicInfoRef} isDetail={isDetail} detailInfo={detailInfo} applyType={applyType} />
      {/* 预约信息 */}
      <ReserveForm bRef={reserveRef} isDetail={isDetail} detailInfo={firstForm} config={config}>
        {(applyType as string) === '1' && auditStatus !== 2 && <Text>第一选择</Text>}
      </ReserveForm>
      {/* 第二选择 */}
      {(applyType as string) === '1' && auditStatus !== 2 && (
        <ReserveForm bRef={reserveSecondRef} isDetail={isDetail} detailInfo={secondForm} config={config}>
          <View>第二选择</View>
          <Text className="text-0.625rem text-#94A4B7">当第一选择医院已约满，系统将自动为您预约第二选择</Text>
        </ReserveForm>
      )}
      {!isDetail && (
        <View className="apply-footer">
          <Button type="info" block round onClick={onSubmit}>
            提交申请
          </Button>
        </View>
      )}
      {auditStatus === 3 && (
        <View className="apply-footer">
          <View className="text-right">
            <Button type="info" plain hairline round onClick={onReschedule}>
              重新预约
            </Button>
          </View>
        </View>
      )}
      <AToast zIndex={9999} />
    </>
  );
};

// 女性两癌一筛体检预约
const SsgPage: FC<any> = ({ qrCodeImg }) => {
  return (
    <>
      <View className="apply-ssg">
        <View className="apply-ssg-qrcode">
          <Image width="100%" height="100%" fit="cover" src={qrCodeImg} />
        </View>
        <View className="apply-ssg-subtitle">请预约扫码二维码</View>
        <View className="apply-ssg-subtitle">登记个人信息进行预约</View>
      </View>
    </>
  );
};

/* 申请进度 */
const Process: FC<any> = ({ auditStatus, detailInfo }) => {
  const { billsPic, remark } = detailInfo;
  // 预览图片
  const onShowPriview = () => {
    Taro.previewImage({
      current: billsPic, // 当前显示图片的http链接
      urls: [billsPic], // 需要预览的图片http链接列表
    });
  };

  return (
    <View className="process">
      {auditStatus === 2 ? (
        <View className="process-success">
          {/* 审核通过 */}
          <View className="process-success-left">
            <View className="process-success-left-title">
              <Icon name="passed" size={Taro.pxTransform(32)} className="icon" style={{ fontWeight: 'bold' }} />
              <Text className="ml-1 font-PM">审核通过</Text>
            </View>
            <View className="process-success-left-mark">{remark}</View>
          </View>
          <View className="process-success-right" onClick={() => onShowPriview()}>
            <View className="process-success-right-icon">
              <Icon name="search" size={Taro.pxTransform(32)} className="icon" style={{ fontWeight: 'bold' }} />
            </View>
            <Image radius={Taro.pxTransform(10)} width="100%" height="100%" fit="cover" src={billsPic} />
          </View>
        </View>
      ) : (
        <>
          {/* 审核中/审核驳回 */}
          <View className="process-title">
            <View className="flex items-center justify-center">
              {auditStatus === 1 && <Icon name="passed" size={Taro.pxTransform(32)} className="icon" style={{ fontWeight: 'bold' }} />}
              {auditStatus === 3 && <Icon name="close" size={Taro.pxTransform(32)} className="icon" style={{ fontWeight: 'bold' }} />}
              <Text className="ml-1">{auditStatus === 1 ? '提交成功' : '审核驳回'}</Text>
            </View>
          </View>
          <View className="process-mark">
            {auditStatus === 1 && <Text>社区审核确认中</Text>}
            {auditStatus === 3 && <Text>{remark}</Text>}
          </View>
        </>
      )}
    </View>
  );
};

// 区分申请类型 根据type来判断
// 判断是申请还是查询进度或者详情 根据id来判断
export default function Apply() {
  const [config, setConfig] = useState<object>({}); // 配置信息
  const [detailInfo, setDetailInfo] = useState<object>({}); // 预约详情
  const [qrCodeImg, setQrCodeImg] = useState<string>();
  const [auditStatus, setAuditStatus] = useState<string | number>(1); // 1-审核中 2-审核通过 3-审核驳回

  const router = useRouter();
  const { applyType, id } = router.params;

  useDidShow(() => {
    // 查看进度 获取详情信息
    if (!!id) {
      getDetail();
    } else {
      getConfig();
    }
    // 设置
    setBarTitle(APPLY_DOCUMENT_TITLE[applyType as string]);
  });

  // 获取配置信息
  const getConfig = async () => {
    const res: any = await GetConfig();
    let obj = {};
    res.forEach((item: any) => {
      obj[item.type] = item;
    });
    // 获取女性"两癌一筛"的二维码
    if (applyType === '3') setQrCodeImg(obj[applyType].picPath);
    setConfig(obj);
  };

  // 获取详情
  const getDetail = async () => {
    const res: any = await GetBookingDetail({ id: id as string });
    if (!res) return false;
    setDetailInfo(res);
    setAuditStatus(Number(res.status));
  };

  return (
    <View className={`apply ${auditStatus === 3 || !id ? 'pb-24' : ''}`}>
      {!!id && applyType !== '3' ? (
        <Process auditStatus={auditStatus} detailInfo={detailInfo} />
      ) : (
        <View className="apply-head">
          <>
            <View className="apply-head-title">{['1', '2'].includes(applyType as string) ? '体检预约信息填写' : '体检预约'}</View>
            <View className="apply-head-subtitle">{APPLY_TITLE[applyType as string]}</View>
          </>
        </View>
      )}

      {applyType !== '3' ? (
        <ContextValue.Provider value={{ applyType, isDetail: !!id, detailInfo, auditStatus, config: config[applyType as string] }}>
          <ApplyForm />
        </ContextValue.Provider>
      ) : (
        <SsgPage qrCodeImg={qrCodeImg} />
      )}
    </View>
  );
}
