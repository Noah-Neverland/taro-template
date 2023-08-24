import type { UserConfigExport } from '@tarojs/cli';
import { createProxy } from './proxy';

const isMock = process.env.TARO_APP_USE_MOCK === 'true';

const mockPlugins = [
  '@tarojs/plugin-mock',
  {
    host: 'localhost',
    port: 9000,
  },
];

let plugins: any = [];

if (isMock) plugins.push(mockPlugins);

export default {
  plugins,
  mini: {},
  h5: {
    devServer: {
      // host: 'test-health.caetar.com',
      https: false,
      port: process.env.TARO_APP_PORT,
      proxy: createProxy(),
      open: true,
    },
  },
} as UserConfigExport;
