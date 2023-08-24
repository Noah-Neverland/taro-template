import { defHttp } from '@/utils/https/request';

enum Api {
  ThirdLogin = '/taishan-api/user/thirdLogin', // 权限下的店铺和院区接口
}

export function LoginApi(data: { code: string | number }) {
  return defHttp.post({ url: Api.ThirdLogin, data });
}
