export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const HTTP_STATUS_TYPE = {
  401: '用户未登录',
  404: '请求资源不存在',
  500: '服务器错误',
  502: '服务端出现了问题',
  503: '服务不可用',
  504: '服务器无响应',
};
