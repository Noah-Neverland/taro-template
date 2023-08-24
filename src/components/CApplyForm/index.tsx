import react, { FC, memo, useImperativeHandle, useEffect, useState } from 'react';
import { Form, Day, Icon, Toast, Cell } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import FormRenderNew from '@/components/FormRender';
import { isPhone, isCardNo } from '@/utils/is';
import { IdCard } from '@/utils';
import dayjs from 'dayjs';
import { GetHospital, GetCommunity } from '@/api/index';
import './index.less';

const AToast = Toast.createOnlyToast();

const basicFields = [
  { title: '姓名', value: 'name' },
  { title: '身份证', value: 'identityCard' },
  { title: '手机号', value: 'phone' },
  { title: '所属社区', value: 'community' },
  { title: '地址', value: 'address' },
];

const reserveFields = [
  { title: '预约医院', value: 'hospital' },
  { title: '预约日期', value: 'date' },
];

const DetailItems: FC<any> = memo(({ fields, values }) => {
  return (
    <>
      {fields.map((item: any, index: number) => (
        <Cell titleWidth="120px" title={item.title} value={values[item.value]} key={`${index}_applyformdetail`}></Cell>
      ))}
    </>
  );
});

// 基本信息
export const BasicForm: FC<any> = memo(({ bRef, detailInfo, isDetail, applyType }) => {
  const [community, setCommunity] = useState([]);
  const formIt = Form.useForm();

  useEffect(() => {
    if (!isDetail) getCommunity();
  }, [formIt, detailInfo, isDetail]);

  useImperativeHandle(bRef, () => ({
    onSubmit,
  }));

  const onSubmit = () => {
    return new Promise((resolve) => {
      formIt.validateFields((errorMessage, fieldValues) => {
        if (errorMessage && errorMessage.length) return;
        resolve(fieldValues);
      });
    });
  };

  // 手机号校验
  const dynamicPhoneRule = react.useMemo(() => {
    return {
      rule: (value: any, call: (errMess: string) => void) => {
        if (!isPhone(value)) call('请输入正确的手机号码');
      },
    };
  }, [formIt.getFieldValue('card')]);

  // 身份证校验
  const dynamicCardRule = react.useMemo(() => {
    return {
      rule: (value: any, call: (errMess: string) => void) => {
        if (!isCardNo(value)) call('请输入正确的身份证');
        // 65周岁的老人发起的申请，需要校验当前所填的身份号年龄有无超过65周岁
        if (applyType === '2' && IdCard(value, 3) < 65) call('不满65周岁，不能申请免费体检服务');
      },
    };
  }, [formIt.getFieldValue('card')]);

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
    setCommunity(arr);
  };

  return (
    <>
      <View className="applyform">
        <View className="applyform-title font-PM">基本信息</View>
        <View className="applyform-form">
          {isDetail ? (
            <DetailItems fields={basicFields} values={detailInfo} />
          ) : (
            <FormRenderNew
              form={formIt}
              config={[
                {
                  fields: 'name',
                  label: '姓名',
                  type: 'input',
                  borderBottom: true,
                  props: {
                    maxlength: 50,
                    disabled: isDetail,
                  },
                  required: !isDetail,
                },
                {
                  fields: 'identityCard',
                  label: '身份证',
                  type: 'input',
                  borderBottom: true,
                  rules: dynamicCardRule,
                  props: {
                    disabled: isDetail,
                  },
                  required: !isDetail,
                },
                {
                  fields: 'phone',
                  label: '手机号',
                  type: 'inputNumber',
                  borderBottom: true,
                  rules: dynamicPhoneRule,
                  props: {
                    disabled: isDetail,
                  },
                  required: !isDetail,
                },
                {
                  fields: 'sex',
                  label: '性别',
                  type: 'picker',
                  borderBottom: true,
                  renderRight: <Icon name="arrow" />,
                  props: {
                    columns: [
                      { value: 1, text: '男' },
                      { value: 2, text: '女' },
                    ],
                  },
                  required: !isDetail,
                },
                {
                  fields: 'communityId',
                  label: '所属社区',
                  type: 'picker',
                  borderBottom: true,
                  renderRight: isDetail ? '' : <Icon name="arrow" />,
                  props: {
                    columns: community,
                    clickable: !isDetail,
                  },
                  required: !isDetail,
                },
                {
                  fields: 'address',
                  label: '地址',
                  type: 'inputTextArea',
                  props: {
                    maxlength: 100,
                    disabled: isDetail,
                  },
                  required: !isDetail,
                },
              ]}
            />
          )}
        </View>
      </View>
    </>
  );
});

// 预约信息
export const ReserveForm: FC<any> = memo(({ bRef, children, detailInfo, isDetail, config }) => {
  const [hospital, setHospital] = useState([]);
  const formIt = Form.useForm();

  useEffect(() => {
    // 查看详情时操作
    if (!isDetail) getHospital();
  }, [detailInfo, isDetail]);

  useImperativeHandle(bRef, () => ({
    onSubmit,
  }));

  const onSubmit = () => {
    return new Promise((resolve) => {
      formIt.validateFields((errorMessage, fieldValues) => {
        if (errorMessage && errorMessage.length) return;
        resolve(fieldValues);
      });
    });
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
    setHospital(arr);
  };

  return (
    <>
      <View className="applyform">
        <View className="applyform-title">
          <View className="font-bold font-PM">预约信息</View>
          <View className="applyform-title-sub">{children}</View>
        </View>
        <View className="applyform-form">
          {isDetail ? (
            <DetailItems fields={reserveFields} values={detailInfo} />
          ) : (
            <FormRenderNew
              form={formIt}
              config={[
                {
                  fields: 'hospitalName',
                  label: '预约医院',
                  type: 'picker',
                  borderBottom: true,
                  renderRight: isDetail ? '' : <Icon name="arrow" />,
                  props: {
                    columns: hospital,
                    clickable: !isDetail,
                  },
                  required: !isDetail,
                },
                {
                  fields: 'booking',
                  label: '预约日期',
                  type: 'calendar',
                  mutiLevel: true,
                  valueFormat: (e) => {
                    return e.detail.value.map((item: any) => dayjs(item).format('YYYY-MM-DD'));
                  },
                  renderRight: isDetail ? '' : <Icon name="arrow" />,
                  props: {
                    type: 'multiple',
                    title: '预约日期',
                    clickable: !isDetail,
                    customValidate: (values: any) => {
                      if (values.length > 2) {
                        AToast.show('预约日期最多选两个');
                        return false;
                      }
                      return true;
                    },
                    formatter: (day: Day): Day => {
                      // 设置可选日期
                      const includesDate = config?.configTimes || [];
                      if (!includesDate.includes(dayjs(day.date).format('YYYY-MM-DD'))) day.type = 'disabled';
                      return day;
                    },
                  },
                  required: !isDetail,
                },
              ]}
            />
          )}
        </View>
      </View>
      <AToast zIndex={9999} />
    </>
  );
});
