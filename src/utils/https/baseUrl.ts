const getBaseUrl = () => {
  let BASE_URL = '';
  if (process.env.TARO_ENV === 'weapp') BASE_URL = process.env.TARO_APP_API as string;
  return BASE_URL;
};

export default getBaseUrl;
