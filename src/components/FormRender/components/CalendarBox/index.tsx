import react from 'react';
import { View } from '@tarojs/components';
import { Calendar } from '@antmjs/vantui';
import dayjs from 'dayjs';
import { omit } from 'lodash-es';

export default function CalendarBox(props: any) {
  const [state, changeState] = react.useState({
    show: false,
    innerValue: null,
  });

  const setState = react.useCallback(
    (key: string, value: any) => {
      changeState({
        ...state,
        [key]: value,
      });
    },
    [state],
  );

  const toggleShow = react.useCallback((show) => {
    setState('show', show);
  }, []);

  const onCancel = react.useCallback(() => {
    if (props.onCancel) props.onCancel();
    toggleShow(false);
  }, []);

  const onConfirm = react.useCallback((e) => {
    // 校验规则
    if (props.customValidate && !props.customValidate(e.detail.value)) return false;
    if (props.onConfirm) props.onConfirm(e);
    toggleShow(false);
  }, []);

  const formatDate = react.useCallback((date: any) => {
    if (['multiple', 'range'].includes(type)) return date.map((item: any) => dayjs(item).format(format || 'YYYY-MM-DD')).join('、');
    return dayjs(date).format(format || 'YYYY-MM-DD');
  }, []);

  const { value, type, format, clickable } = props;

  return (
    <>
      <View onClick={clickable ? () => toggleShow(true) : () => {}} style={{ minWidth: '200px' }}>
        {value ? formatDate(value) : '请选择'}
      </View>
      <Calendar
        type="single"
        defaultDate={state.innerValue || value || []}
        position="bottom"
        color="#4890ff"
        longspan={false}
        show={state.show}
        onClose={onCancel}
        onConfirm={onConfirm}
        {...omit(props, ['value', 'onConfirm', 'onChange'])}
      />
    </>
  );
}
