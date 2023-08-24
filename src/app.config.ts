import { RootPageRouters, PackageARouters, PackageBRouters } from '../config/router';

function RouterTransform(routers: any, replace: string) {
  return Object.keys(routers).map((item: any) => item.replace(replace, ''));
}

export default defineAppConfig({
  pages: RouterTransform(RootPageRouters, '/'),
  lazyCodeLoading: 'requiredComponents',
  subpackages: [
    {
      root: 'pages/packageA/',
      pages: RouterTransform(PackageARouters, '/pages/packageA/'),
    },
    {
      root: 'pages/packageB/',
      pages: RouterTransform(PackageBRouters, '/pages/packageB/'),
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F5F7FA',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F5F7FA',
  },
});
