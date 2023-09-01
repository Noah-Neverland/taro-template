import { defHttp } from '@/utils/https/request';
import { HospitalData } from './model/hospital';

enum Api {
  getHospital = '/taishan-api/hospital/getHospital', // 获取医院信息
  getDict = '/taishan-api/hospital/getDict', // 获取区域、等级、特色科室
  getHospitalInfo = '/taishan-api/hospital/getHospitalInfo', // 获取医院详情
}

/**
 * @name: 获取医院信息
 * @param {object} data
 * @return {*}
 */
export function GetHospital(data?: Partial<HospitalData>) {
  return defHttp.get({ url: Api.getHospital, data });
}

/**
 * @name: 获取区域、等级、特色科室
 * @return {*}
 */
export function GetDict() {
  return defHttp.get({ url: Api.getDict });
}

/**
 * @name: 获取医院详情
 * @return {*}
 */
export function GetHospitalInfo(data: { id: number }) {
  return defHttp.get({ url: Api.getHospitalInfo, data });
}
