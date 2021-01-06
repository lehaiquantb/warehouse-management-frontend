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
