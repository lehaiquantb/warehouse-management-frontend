import store from "../redux/index";

export const viewMore = () => {
  console.log("implement feature here");
};

export const initModule = async (path, module) => {
  const [reducer, saga] = await Promise.all([
    import(`../pages/${path}/reducer`),
    import(`../pages/${path}/saga`),
  ]);
  store.injectReducer(module, reducer.default);
  store.injectSaga(module, saga.default);
  return "ok";
};

// export const initModule
