/*
 * @Descripttion: is
 * @version: 1.0.0
 * @Author: shuaishuai.han
 * @Date: 2023-08-08 15:00:02
 */
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}

/**
 * @name: 只校验手机格式
 * @param {string} path
 * @return {*}
 */
export function isPhone(path: string): boolean {
  const reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
  return reg.test(path);
}
/**
 * @name: 校验是否是座机或者手机格式
 * @param {string} path
 * @return {*}
 */
export function isContactWay(path: string): boolean {
  const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{1,4}))?$|1[3|4|5|6|7|8|9][0-9]\d{8,8}$/;
  return reg.test(path);
}

/**
 * @name: 校验大陆身份号
 * @param {string} card
 * @return {*}
 */
export function isCardNo(card: any): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

/**
 * @name: 校验香港身份证号 开头一位或两位大写字母，然后接上6-10位数字，最后一位数字或字母校验
 * @param {string} card
 * @return {*}
 */
export function isCardNoHongKang(card: any): boolean {
  const reg = /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/;
  return reg.test(card);
}

/**
 * @name: 校验澳门身份证号 开头数字1或者5或者7，然后接上6位数字，再接上一位数字或者大写字母校验
 * @param {string} card
 * @return {*}
 */
export function isCardNoAoMen(card: any): boolean {
  const reg = /^[1|5|7][0-9]{6}[0-9A-Z]$/;
  return reg.test(card);
}

/**
 * @name: 校验台湾身份证号码 开头一位小写或者大写字母，接上9位数字
 * @param {string} card
 * @return {*}
 */
export function isCardNoTaiWan(card: any): boolean {
  const reg = /^[a-zA-Z][0-9]{9}$/;
  return reg.test(card);
}

/**
 * @name: 校验密码格式
 * @param {string} password
 * @return {*}
 */
export function isPassword(password: string): boolean {
  // const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,}$/;
  const reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,}$/;
  return reg.test(password);
}

/**
 * @name: 判断是否是pc
 * @return {*}
 */
export function isPc() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * @name: 判断是否是ios系统
 */
export const isIOS = () => {
  const u = navigator.userAgent;
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) return true;
  return false;
};
