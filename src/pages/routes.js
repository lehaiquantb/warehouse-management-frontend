let routes = [];
const context = require.context('.', true, /route.js$/);
context.keys().forEach((path) => {
  routes.push(context(`${path}`).default);
  if (context(`${path}`).childRoutes) {
    context(`${path}`).childRoutes.forEach((childRoute) => {
      routes.push(childRoute);
    });
  }
});
export default routes;
