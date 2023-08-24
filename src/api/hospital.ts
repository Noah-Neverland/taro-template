import { defHttp } from '@/utils/https/request';

enum Api {
  getHospital = '/taishan-api/booking/getHospital', // 获取医院信息
}

/**
 * @name: 获取医院信息
 * @param {object} data
 * @return {*}
 */
export function GetHospital(data: { name: string }) {
  return defHttp.get({ url: Api.getHospital, data });
}
