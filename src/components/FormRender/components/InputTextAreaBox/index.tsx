import react from 'react';
import { View, Textarea } from '@tarojs/components';
import { omit } from 'lodash-es';

export default function InputTextAreaBox(props) {
  const onInput = react.useCallback((e) => {
    if (props.onConfirm) props.onBlur(e);
  }, []);

  const { value } = props;

  return (
    <>
      <View style={{ minWidth: '200px' }}>
        <Textarea
          value={value || ''}
          placeholder="请输入"
          style={{ width: '100%', height: 'auto', textAlign: 'right' }}
          autoHeight
          onInput={onInput}
          {...omit(props, ['value', 'onConfirm', 'onChange'])}
        />
      </View>
    </>
  );
}
