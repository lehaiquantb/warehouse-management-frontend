import { lazy } from "react";
import { initModule } from "../../helpers";

export default {
  path: "/suppliers",
  exact: true,
  isPrivate:true,
  component: lazy(async () => {
    await initModule("Supplier", "suppliers");
    return import(".");
  }),
};


export const childRoutes = [
  {
    path: '/suppliers/create',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Supplier', 'suppliers');
      return import('./createSupplier');
    }),
  },
  {
    path: '/suppliers/:SCode',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Supplier', 'suppliers');
      return import('./supplierDetail');
    }),
  },
  {
    path: '/suppliers/:SCode/edit',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Supplier', 'suppliers');
      return import('./editSupplier');
    }),
  },
];
