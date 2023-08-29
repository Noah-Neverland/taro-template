import react from 'react';
import { View } from '@tarojs/components';
import { Popup, Picker } from '@antmjs/vantui';
import { omit } from 'lodash-es';

export default function PickerBox(props: any) {
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
    props.cofirmCallback && props.cofirmCallback(e);
    if (props.onConfirm) props.onConfirm(e);
    toggleShow(false);
  }, []);

  const showText = react.useCallback((value: string | number, columns: any[]) => {
    const filter = columns.filter((item: any) => item.value === value);
    return filter && filter.length && filter[0].text;
  }, []);

  const defaultIndex = react.useCallback((selected: any, columns: any[]) => {
    if (selected) return columns.findIndex((item: any) => item.value === selected);
  }, []);

  const { value, columns, clickable = true } = props;

  return (
    <>
      <View onClick={clickable ? () => toggleShow(true) : () => {}} style={{ minWidth: '200px' }}>
        {value ? showText(value, columns) : '请选择'}
      </View>
      <Popup position="bottom" show={state.show} onClose={() => toggleShow(false)}>
        <Picker defaultIndex={defaultIndex(state.innerValue || value, columns)} onConfirm={onConfirm} onCancel={onCancel} {...omit(props, ['value', 'onConfirm', 'onChange'])} />
      </Popup>
    </>
  );
}
