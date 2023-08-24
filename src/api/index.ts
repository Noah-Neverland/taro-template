/*
 * @Descripttion: api
 * @version: 1.0.0
 * @Author: shuaishuai.han
 * @Date: 2023-08-22 10:05:00
 */
import { defHttp } from '@/utils/https/request';

enum Api {
  getConfig = '/taishan-api/config/getConfig', // 获取体检配置信息
  getBooking = '/taishan-api/booking/getBooking', // 获取预约列表
  getHospital = '/taishan-api/booking/getHospital', // 获取医院列表
  getCommunity = '/taishan-api/booking/getCommunity', // 获取社区
  addBooking = '/taishan-api/booking/addBooking', // 体检预约申请
  getBookingDetail = '/taishan-api/booking/getBookingDetail', // 预约详情
}

interface addBookingParams {
  name: string; // 姓名
  identityCard: string; // 身份证
  phone: number; // 手机号
  communityId: number; // 社区id
  address: string; // 地址
  firstId: number; // 第一选择医院id
  firstTime: string[]; // 预约日期集合
  secondId: number; // 第二选择医院id
  secondTime: string[]; // 预约日期集合
}

/**
 * @name: 获取预约列表
 * @return {*}
 */
export function GetBooking() {
  return defHttp.get({ url: Api.getBooking });
}

/**
 * @name: 获取体检配置信息
 * @return {*}
 */
export function GetConfig() {
  return defHttp.get({ url: Api.getConfig });
}

/**
 * @name: 获取医院列表
 * @return {*}
 */
export function GetHospital() {
  return defHttp.get({ url: Api.getHospital });
}

/**
 * @name: 获取社区
 * @return {*}
 */
export function GetCommunity() {
  return defHttp.get({ url: Api.getCommunity });
}

/**
 * @name: 体检预约申请
 * @return {*}
 */
export function AddBooking(data: addBookingParams) {
  return defHttp.post({ url: Api.addBooking, data });
}

/**
 * @name: 预约详情
 * @param {object} data
 * @return {*}
 */
export function GetBookingDetail(data: { id: number | string }) {
  return defHttp.get({ url: Api.getBookingDetail, data });
}
