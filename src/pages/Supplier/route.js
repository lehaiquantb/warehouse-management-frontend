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
