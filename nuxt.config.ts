import { Configuration } from '@nuxt/types';

/* eslint-disable @typescript-eslint/no-unused-vars */

// 環境変数に初期値を割り当てる
const {
  // ビルド時に使用する環境変数
  BUILD_ENV = 'local',
  NUXT_PORT = '4000',
  NUXT_HOST = '0.0.0.0',

  // Nuxtアプリに渡す環境変数
  // 本番では、AWS ECS → process.env に値が渡ってきて上書きされる
  // デフォルト値は開発用
  envName = 'local',
  // apiEndpointUrl = 'https://crudcrud.com/api/356f8bc5acb84ae584ae5642b7ba23ba',
  apiEndpointUrl = 'http://localhost:8090/api',

  // apiEndpointUrl = 'https://localhost:5555/api', // mock server
} = process.env;

const config: Configuration = {
  // Universalモード（SSR）で実行
  mode: 'universal',
  // ソースディレクトリ
  srcDir: 'src',
  // ビルド時にのみ使用するモジュール
  buildModules: ['@nuxt/typescript-build'],
  // headの設定
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
  },
  // css
  css: ['@/assets/css/base.scss'],
  // Vue.configの拡張
  vue: {
    config: {
      productionTip: false,
    },
  },
  // modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  modules: ['@nuxtjs/axios', ['cookie-universal-nuxt', { parseJSON: false }]],
  axios: {
    baseURL: apiEndpointUrl,
    // proxy: true,
  },

  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],

  // proxy: {
  //   '/api/': {
  //     target: 'localhost:8080',
  //     pathRewrite: { '^/api/': '' },
  //   },
  // },
  // 環境変数
  env: {
    // process.env から分割代入で取得したもの
    envName,
    apiEndpointUrl,
  },
  // 開発サーバー
  server: {
    port: NUXT_PORT,
    host: NUXT_HOST,
  },
};

module.exports = config;
