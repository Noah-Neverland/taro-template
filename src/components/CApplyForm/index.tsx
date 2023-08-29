import react, { FC, memo, useImperativeHandle, useEffect } from 'react';
import { Form, Day, Icon, Toast, Cell } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import FormRenderNew from '@/components/FormRender';
import { useAppSelector } from '@/hooks/store';
import { isPhone, isCardNo } from '@/utils/is';
import { IdCard } from '@/utils';
import dayjs from 'dayjs';
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
  { title: '预约医院', value: 'hospitalName' },
  { title: '预约日期', value: 'booking' },
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
  const formIt = Form.useForm();

  const community = useAppSelector((state) => state.genreConfigSlice.communitys);

  useEffect(() => {
    if (JSON.stringify(detailInfo) !== '{}') formIt.setFields({ ...detailInfo });
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
                  },
                  required: true,
                },
                {
                  fields: 'identityCard',
                  label: '身份证',
                  type: 'input',
                  borderBottom: true,
                  rules: dynamicCardRule,
                  required: true,
                },
                {
                  fields: 'phone',
                  label: '手机号',
                  type: 'inputNumber',
                  borderBottom: true,
                  rules: dynamicPhoneRule,
                  required: true,
                },
                {
                  fields: 'communityId',
                  label: '所属社区',
                  type: 'picker',
                  borderBottom: true,
                  renderRight: isDetail ? '' : <Icon name="arrow" />,
                  props: {
                    columns: community,
                  },
                  required: true,
                },
                {
                  fields: 'address',
                  label: '地址',
                  type: 'inputTextArea',
                  props: {
                    maxlength: 100,
                    value: '123',
                  },
                  required: true,
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
export const ReserveForm: FC<any> = memo(({ bRef, children, detailInfo, isDetail }) => {
  const formIt = Form.useForm();

  const { config, hospitals } = useAppSelector((state) => state.genreConfigSlice);

  useEffect(() => {
    // 查看详情时操作
    if (JSON.stringify(detailInfo) !== '{}') formIt.setFields({ ...detailInfo });
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
                    columns: hospitals,
                    cofirmCallback: (e) => {
                      const oldValue = formIt.getFieldValue('hospitalName');
                      if (oldValue !== e.detail.value.value) {
                        formIt.setFieldsValue('booking', undefined);
                      }
                    },
                  },
                  required: true,
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
