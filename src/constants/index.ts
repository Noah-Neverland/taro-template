export const STATUS_TYPE = {
  1: '待审核',
  2: '已通过',
  3: '已驳回',
};

export const SEX_TYPE = {
  1: '男',
  2: '女',
};

export const RADIO_TYPE_OPTIONS = [
  {
    title: '企业退休人员',
    subtitle: '企业退休人员免费健康体检（纳入泰山街道社会化管理人员）',
    value: 1,
    icon: require('@/assets/images/genre/genre_icon_01.jpg'),
  },
  {
    title: '65周岁以上老人',
    subtitle: '65周岁以上老年人免费体检',
    value: 2,
    icon: require('@/assets/images/genre/genre_icon_02.jpg'),
  },
  {
    title: '女性"两癌一筛"',
    subtitle: '妇女免费"两癌一筛"检查预约',
    value: 3,
    icon: require('@/assets/images/genre/genre_icon_03.jpg'),
  },
];

export const APPLY_TITLE = (() => {
  let obj = {};
  RADIO_TYPE_OPTIONS.forEach((item: any, index: number) => {
    obj[index + 1] = item.subtitle;
  });
  return obj;
})();

export const APPLY_DOCUMENT_TITLE = {
  1: '企业退休人员体检预约',
  2: '65周岁以上老人体检预约',
  3: '女性“两癌一筛”体检预约',
};

export const APPLY_INFO_ARRAYS = [
  { title: '身份证号', field: 'identityCard' },
  { title: '申请时间', field: 'applyTime' },
  { title: '体检时间', field: 'bookingTime' },
  { title: '体检医院', field: 'hospitalName' },
];
