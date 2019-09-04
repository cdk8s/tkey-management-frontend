import {IConfig} from 'umi-types';

import routes from './config/router.config';
import plugins from './config/plugins.config';
import theme from './config/theme.config';

const constant = require('./src/constants/globalConstant');
/**
 * 部署相关参数可以参看：https://umijs.org/zh/guide/deploy.htm
 */
const config: IConfig = {
    treeShaking: true,
    base: 'tkey-sso-client-management-frontend',
    publicPath:'/tkey-sso-client-management-frontend/',
    targets: {
        ie: 11,
    },
    ignoreMomentLocale:true,
    disableCSSModules: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    plugins,
    routes,
    theme,
    define: constant.constant.testConstant,
};

export default config;
