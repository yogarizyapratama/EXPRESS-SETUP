import { apiRoute } from "./api.route.js";
import { authRouter } from "./auth.route.js";

const _routes = [
  ["/api/", apiRoute],
  ["/api/auth", authRouter],
];

export const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
