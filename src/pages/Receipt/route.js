import { lazy } from "react";
import { initModule } from "../../helpers";

export default {
  path: "/receipts",
  exact: true,
  isPrivate:true,
  component: lazy(async () => {
    await initModule("Receipt", "receipts");
    return import(".");
  }),
};


export const childRoutes = [
  {
    path: '/receipts/create',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Receipt', 'receipts');
      return import('./createReceipt');
    }),
  },
  {
    path: '/receipts/:RCode',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Receipt', 'receipts');
      return import('./receiptDetail');
    }),
  },
  {
    path: '/receipts/:RCode/edit',
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
      await initModule('Receipt', 'receipts');
      return import('./editReceipt');
    }),
  },
];