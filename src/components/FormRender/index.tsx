import { TextareaProps } from '@tarojs/components';
import { IMakeFormCompProps, IFormRenderItemProps, IMakeFormRenderProps, FormRender, Icon, CalendarProps, PickerProps } from '@antmjs/vantui';
import DatetimePickerBox from './components/DatetimePickerBox';
import CalendarBox from './components/CalendarBox';
import InputTextAreaBox from './components/InputTextAreaBox';
import PickerBox from './components/PickerBox';

interface CalendarPropsNew extends CalendarProps {
  format?: string;
  clickable?: boolean;
  customValidate?: Function;
}

interface PickerPropsNew extends PickerProps {
  clickable?: boolean;
}

export type IFormBoxItemPropsNew<T> =
  | IFormRenderItemProps<T>
  | IMakeFormCompProps<'dateTimePicker', any, T>
  | IMakeFormCompProps<'calendar', CalendarPropsNew, T>
  | IMakeFormCompProps<'inputTextArea', TextareaProps, T>
  | IMakeFormCompProps<'picker', PickerPropsNew, T>;

export type IFormRenderPropsNew<T> = IMakeFormRenderProps<T, IFormBoxItemPropsNew<T>>;

FormRender.resiterComponent({
  type: 'dateTimePicker',
  component: DatetimePickerBox,
  valueKey: 'value',
  trigger: 'onConfirm',
  renderRight: <Icon name="arrow" />,
  valueFormat: (e) => e.detail.value,
  transformProps(props) {
    return { ...props };
  },
});

FormRender.resiterComponent({
  type: 'calendar',
  component: CalendarBox,
  valueKey: 'value',
  trigger: 'onConfirm',
  renderRight: <Icon name="arrow" />,
  valueFormat: (e) => e.detail.value,
  transformProps(props) {
    return { ...props };
  },
});

FormRender.resiterComponent({
  type: 'inputTextArea',
  component: InputTextAreaBox,
  valueKey: 'value',
  trigger: 'onInput',
  valueFormat: (e) => e.detail.value,
  transformProps(props) {
    return { ...props };
  },
});

FormRender.resiterComponent({
  type: 'picker',
  component: PickerBox,
  valueKey: 'value',
  trigger: 'onConfirm',
  renderRight: <Icon name="arrow" />,
  valueFormat: (e) => e.detail.value.value,
  transformProps(props) {
    return { ...props };
  },
});

function FormRenderNew<T>(props: IFormRenderPropsNew<T>) {
  return <FormRender {...(props as any)} />;
}

FormRenderNew['resiterComponent'] = FormRender.resiterComponent;
FormRenderNew['showComponents'] = FormRender.showComponents;

export default FormRenderNew;
