import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/codeCallback',
    component: '../layouts/codeToTokenLayout.tsx',
  },
  {
    path: '/',
    component: '../layouts/MainLayout.tsx',
    routes: [
      { path: '/', redirect: '/TKeyClient' },
      { path: '/403', component: '../components/Exception/403.tsx' },
      { path: '/404', component: '../components/Exception/404.tsx' },
      { path: '/500', component: '../components/Exception/500.tsx' },
      { path: '/TKeyClient', component: './TKeyClient/index.tsx' },
    ],
  },
];

export default routes;
