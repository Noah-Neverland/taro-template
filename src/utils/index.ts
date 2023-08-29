import { isObject } from '@/utils/is';
import { cloneDeep } from 'lodash-es';

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : target[key];
  }
  return res;
}

/**
 * @name: 防抖
 * @param {Function} func 函数
 * @param {number} wait 延迟毫秒数
 * @param {boolean} immediate true 立即执行, false 非立即执行
 * @return {*}
 */
export function debounce(func: Function, wait?: number, immediate?: boolean) {
  // 函数不能立即执行，增加参数immediate
  let timer: any = null;
  return function () {
    const _this = this; // 解决 setTimeout中this的指向问题
    let arg = arguments; // 解决 func中参数丢失的问题
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 使函数立即执行
      let runNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait || 500);
      if (runNow) {
        func.apply(_this, arg);
      }
    } else {
      timer = setTimeout(() => {
        func.apply(_this, arg);
      }, wait || 500);
    }
  };
}

/**
 * @name: 节流
 * @param {Function} func 函数
 * @param {number} wait 延迟毫秒数
 * @return {*}
 */
export function throttle(func: Function, wait?: number) {
  let timer;
  return function () {
    let _this = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(_this, arguments);
      }, wait || 500);
    }
  };
}

/**
 * @name: 根据身份证信息获取用户信息
 * @param {any} card 身份号
 * @param {number} type 获取类型
 * @return {*}
 */
export const IdCard = (card: any, type: number): any => {
  switch (type) {
    case 2: // 获取性别
      return parseInt(card.substr(16, 1)) % 2 === 1 ? '男' : '女';
    case 3: // 获取年龄
      const ageDate = new Date();
      const month = ageDate.getMonth() + 1;
      const day = ageDate.getDate();
      let age = ageDate.getFullYear() - card.substring(6, 10) - 1;
      if (Number(card.substring(10, 12)) < month || (Number(card.substring(10, 12)) === month && Number(card.substring(12, 14)) <= day)) {
        age++;
      }
      if (age <= 0) {
        age = 1;
      }
      return age;
    default: // 默认获取出生日期
      const birthday = card.substring(6, 10) + '-' + card.substring(10, 12) + '-' + card.substring(12, 14);
      return birthday;
  }
};
