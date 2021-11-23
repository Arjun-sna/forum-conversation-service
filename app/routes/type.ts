import { RequestHandler } from "express";
import { AsyncRequestHandler } from "express-promise-wrap";

export enum Method {
  get = "get",
  post = "post",
  patch = "patch",
  delete = "delete",
}

export type MethodHandlers = {
  [key in Method]?: AsyncRequestHandler;
};

export type RoutesConfig = {
  root: string;
  routes: {
    [key: string]: {
      middlewares?: RequestHandler[];
    } & MethodHandlers;
  };
  middlewares?: RequestHandler[];
};
