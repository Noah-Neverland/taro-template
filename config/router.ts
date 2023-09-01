export const RootPageRouters = {
  '/pages/index/index': '/index',
  '/pages/login/index': '/login',
};

export const PackageARouters = {
  '/pages/packageA/apply/index': '/apply',
  '/pages/packageA/genre/index': '/genre',
};

export const PackageBRouters = {
  '/pages/packageB/hospitals/index': '/hospitals',
  '/pages/packageB/hospitalDetail/index': '/hospitalDetail',
  '/pages/packageB/specialissts/index': '/specialissts',
};

// h5路由转换
export const h5Routers = { ...RootPageRouters, ...PackageARouters, ...PackageBRouters };
