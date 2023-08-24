import npath from 'path';
import { defineConfig, UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import UnoCSS from 'unocss/webpack';
import devConfig from './dev';
import prodConfig from './prod';
import { h5Routers } from './router';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: '泰山街道',
    date: '2023-8-3',
    // designWidth: (input: any) => {
    //   // 配置 NutUI 375 尺寸
    //   if (input?.file?.replace(/\\+/g, '/').indexOf('@antmjs') > -1) {
    //     return 375;
    //   }
    //   // 全局使用 Taro 默认的 750 尺寸
    //   return 750;
    // },
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack4',
    mini: {
      miniCssExtractPluginOption: { ignoreOrder: true },
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      lessLoaderOption: {
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${npath.join(process.cwd(), 'src/assets/style/variables.less')}";`,
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.plugin('unocss').use(UnoCSS());
      },
    },
    h5: {
      router: {
        mode: 'browser',
        basename: `/${process.env.TARO_APP_H5_BASENAME}`,
        customRoutes: h5Routers,
      },
      // publicPath: '/',
      publicPath: `/${process.env.TARO_APP_H5_BASENAME}`,
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        pxtransform: {
          enable: true,
          config: {
            onePxTransform: true,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            baseFontSize: 16,
            maxRootSize: 40,
            minRootSize: 12,
          },
        },
      },
      lessLoaderOption: {
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${npath.join(process.cwd(), 'src/assets/style/variables.less')}";`,
          },
        },
      },
      esnextModules: ['@antmjs/vantui'],
      useHtmlComponents: false,
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.plugin('unocss').use(UnoCSS());
      },
    },
    rn: {
      appName: '泰山街道',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  switch (mode) {
    case 'development':
      // 本地开发构建配置（不混淆压缩）
      return merge({}, baseConfig, devConfig);
    default:
      // 生产构建配置（默认开启压缩混淆等）
      return merge({}, baseConfig, prodConfig);
  }
});
