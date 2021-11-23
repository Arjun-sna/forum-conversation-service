import { Express } from "express";
import { ROUTE_V1_PREFIX } from "../utils/constants";
import routerV1 from "./v1";

export function initRoutes(app: Express) {
  app.use(ROUTE_V1_PREFIX, routerV1);
}
