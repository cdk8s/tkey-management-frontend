import { IConfig } from 'umi-types';

import routes from './config/router.config';
import plugins from './config/plugins.config';
import theme from './config/theme.config';

let constant = require('./src/constants/globalConstant');

/**
 * 部署相关参数可以参看：https://umijs.org/zh/guide/deploy.htm
 */
const config: IConfig = {
    treeShaking: true,
    targets: {
        ie: 11,
    },
    disableCSSModules: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    plugins,
    routes,
    theme,
    ignoreMomentLocale: true,
    define: constant.constant.devConstant,
    proxy: {
        [constant.constant.devConstant['process.env.API_SERVER']]: {
            target: 'http://management.cdk8s.com:9095',
            pathRewrite: { [`^/${constant.constant.devConstant['process.env.API_SERVER']}`]: '' },
            changeOrigin: true,
        },
    },
    chainWebpack: function(config: any, { webpack }: any) {
        config.merge({
            optimization: {
                minimize: true,
                splitChunks: {
                    chunks: 'all',
                    minSize: 30000,
                    minChunks: 3,
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        vendor: {
                            name: 'vendors',
                            test({ resource }: any) {
                                return /[\\/]node_modules[\\/]/.test(resource);
                            },
                            priority: 10,
                        },
                    },
                },
            },
        });
    },
};

export default config;
