import { IPlugin } from 'umi-types';

/**
 * ref: https://umijs.org/plugin/umi-plugin-react.html
 */
const plugins: IPlugin[] = [
    ['umi-plugin-react', {
        antd: true,
        dva: true,
        dynamicImport: {
            webpackChunkName: true,
            loadingComponent: './components/PageLoading/index.tsx',
        },
        title: 'TKey SSO Client 管理系统',
        locale: {
            enable: true,
            default: 'en-US',
        },
        dll: {
            include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            exclude: ['@babel/runtime', 'netlify-lambda'],
        },
        chunks: ['vendors', 'umi'],
        routes: {
            exclude: [
                /models\//,
                /services\//,
                /model\.(t|j)sx?$/,
                /service\.(t|j)sx?$/,
                /components\//,
            ],
        },
    }],
];

export default plugins;
