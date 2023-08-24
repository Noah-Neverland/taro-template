import { FC, memo } from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';

type Props = {
  setClose: (visible: boolean) => void;
  content: string;
};

const CNotice: FC<Props> = memo(({ setClose, content }) => {
  return (
    <View className="cnotice">
      <View className="cnotice-title">
        <Text>预约须知</Text>
      </View>
      <View className="cnotice-content" dangerouslySetInnerHTML={{ __html: content }}></View>
      <View className="cnotice-footer">
        <Text className="cnotice-footer-cancel" onClick={() => setClose(false)}>
          取消
        </Text>
        <Text className="cnotice-footer-ok" onClick={() => setClose(false)}>
          我已阅读并同意
        </Text>
      </View>
    </View>
  );
});

export default CNotice;
