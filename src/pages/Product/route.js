import { lazy } from 'react';
import { initModule } from '../../helpers';

export default {
  path: '/products',
  exact: false,
  isPrivate: true,
  component: lazy(async () => {
    await initModule('Product', 'products');
    return import('.');
  }),
};

export const childRoutes = [
  {
    path: '/products/create',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Product', 'products');
      return import('./createProduct');
    }),
  },
  {
    path: '/products/:PCode',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Product', 'products');
      return import('./productDetail');
    }),
  },
  {
    path: '/products/:PCode/edit',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Product', 'products');
      return import('./editProduct');
    }),
  },
];

export const createProductRoute = {
  path: '/products/create',
  exact: true,
  isPrivate: true,
  component: lazy(async () => {
    return import('./createProduct');
  }),
};
