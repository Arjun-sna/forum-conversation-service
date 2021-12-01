import jwt from "express-jwt";
import unless from "express-unless";
import { CustomRequest, UserModel } from "../types";
import { Response, NextFunction } from "express";
import db from "../db";
import { ServerError } from "../exceptions/ServerError";

const {
  models: { User },
} = db;

export const jwtMiddleware = jwt({
  secret: "70126b7a94f61088e836b2d415fd7230bf4fa51d0be89858",
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
