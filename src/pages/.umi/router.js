import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/youmeek/code_space/node_code/tkey-sso-management-frontend/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/TKeyClient',
    exact: true,
    _title: 'TKey SSO Client 管理系统',
    _title_default: 'TKey SSO Client 管理系统',
  },
  {
    path: '/codeCallback',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__codeToTokenLayout" */ '../../layouts/codeToTokenLayout.tsx'),
        })
      : require('../../layouts/codeToTokenLayout.tsx').default,
    exact: true,
    _title: 'TKey SSO Client 管理系统',
    _title_default: 'TKey SSO Client 管理系统',
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__MainLayout" */ '../../layouts/MainLayout.tsx'),
        })
      : require('../../layouts/MainLayout.tsx').default,
    routes: [
      {
        path: '/403',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "components__Exception__403" */ '../../components/Exception/403.tsx'),
            })
          : require('../../components/Exception/403.tsx').default,
        exact: true,
        _title: 'TKey SSO Client 管理系统',
        _title_default: 'TKey SSO Client 管理系统',
      },
      {
        path: '/404',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "components__Exception__404" */ '../../components/Exception/404.tsx'),
            })
          : require('../../components/Exception/404.tsx').default,
        exact: true,
        _title: 'TKey SSO Client 管理系统',
        _title_default: 'TKey SSO Client 管理系统',
      },
      {
        path: '/500',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "components__Exception__500" */ '../../components/Exception/500.tsx'),
            })
          : require('../../components/Exception/500.tsx').default,
        exact: true,
        _title: 'TKey SSO Client 管理系统',
        _title_default: 'TKey SSO Client 管理系统',
      },
      {
        path: '/TKeyClient',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__TKeyClient__index" */ '../TKeyClient/index.tsx'),
            })
          : require('../TKeyClient/index.tsx').default,
        exact: true,
        _title: 'TKey SSO Client 管理系统',
        _title_default: 'TKey SSO Client 管理系统',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/youmeek/code_space/node_code/tkey-sso-management-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'TKey SSO Client 管理系统',
        _title_default: 'TKey SSO Client 管理系统',
      },
    ],
    _title: 'TKey SSO Client 管理系统',
    _title_default: 'TKey SSO Client 管理系统',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/youmeek/code_space/node_code/tkey-sso-management-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'TKey SSO Client 管理系统',
    _title_default: 'TKey SSO Client 管理系统',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
