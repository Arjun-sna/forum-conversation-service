import jwt from "express-jwt";
import unless from "express-unless";
import { CustomRequest, UserModel } from "../types";
import { Response, NextFunction } from "express";
import db from "../db";
import { ServerError } from "../exceptions/ServerError";
import config from "../config";

const {
  models: { User },
} = db;

export const jwtMiddleware = jwt({
  secret: config.jwt.secret,
  algorithms: ["HS256"],
  requestProperty: "jwtPayload",
});

async function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  jwtMiddleware(req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      const userId = req.jwtPayload.user_id;
      if (!userId) {
        return next(new ServerError("Authentication Failed", 401));
      }
      const currentUser = await User.findOne({ where: { id: userId } });
      if (!currentUser) {
        return next(new ServerError("Authentication Failed", 401));
      }
      req.currentUser = currentUser as UserModel;
      next();
    }
  });
}
authMiddleware.unless = unless;

export default authMiddleware;
