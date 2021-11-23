import { Router, Application } from "express";
import { Router as IRouter } from "express-serve-static-core";
import { forEach } from "lodash";
import { wrap } from "express-promise-wrap";
import logHelper from "../utils/logger";
import exceptionHandler from "../middlewares/errorHandlers";

import routeConfig from "./routeConfigs";
import { Method } from "./type";

const apiVersion = process.env.API_VERSION;
const API_PATH = `/api/${apiVersion}`;

export default function (app: Application) {
  const apiRoutes: IRouter = Router();

  app.use(logHelper.getRequestLogger());
  app.use(logHelper.getResponseLogger());

  routeConfig.forEach((routeConfig) => {
    const {
      root = "",
      routes,
      middlewares: rootMiddlewares = [],
    } = routeConfig;
    forEach(routes, ({ middlewares = [], ...controllers }, path) => {
      forEach(controllers, (handler, httpMethod: Method) => {
        apiRoutes[httpMethod](
          `/${root}/${path}`,
          [...rootMiddlewares, ...middlewares],
          wrap(handler)
        );
      });
    });
  });

  app.use(API_PATH, apiRoutes);
  app.use(exceptionHandler);
}
