import { lazy } from "react";
import { initModule } from "../../helpers";

export default {
  path: "/home",
  exact: true,
  isPrivate:true,
  component: lazy(async () => {
    await initModule("Home", "homes");
    return import(".");
  }),
};
