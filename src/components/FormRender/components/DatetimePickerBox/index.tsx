import react from 'react';
import { View } from '@tarojs/components';
import { Popup, DatetimePicker } from '@antmjs/vantui';
import dayjs from 'dayjs';
import { omit } from 'lodash-es';

const FormateTypes = {
  datetime: 'YYYY-MM-DD HH:mm',
  date: 'YYYY-MM-DD',
  'year-month': 'YYYY-MM',
  time: 'HH:mm',
};

export default function DatetimePickerBox(props: any) {
  const [state, changeState] = react.useState({
    show: false,
    innerValue: null,
  });

  const setState = react.useCallback(
    (key, value) => {
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

  const onConfirm = react.useCallback((e) => {
    if (props.onConfirm) props.onConfirm(e);
    toggleShow(false);
  }, []);

  const onCancel = react.useCallback(() => {
    if (props.onCancel) props.onCancel();
    toggleShow(false);
  }, []);

  const { value, type } = props;

  const formatDate = react.useCallback((date: number) => {
    if (type === 'time') return date;
    return dayjs(date).format(FormateTypes[type] || 'YYYY-MM-DD HH:mm');
  }, []);

  return (
    <>
      <View onClick={() => toggleShow(true)} style={{ minWidth: '200px' }}>
        {value ? formatDate(value) : '请选择日期'}
      </View>
      <Popup position="bottom" show={state.show} onClose={() => toggleShow(false)}>
        <DatetimePicker {...omit(props, ['value', 'onConfirm', 'onChange'])} value={state.innerValue || value} onConfirm={onConfirm} onCancel={onCancel} />
      </Popup>
    </>
  );
}
