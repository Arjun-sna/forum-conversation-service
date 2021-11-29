import { CustomRequest, UserModel } from "../types";
import { Response, NextFunction } from "express";
import db from "../db";

const {
  models: { User },
} = db;

export default async function (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  /**
   * Auth service to be used
   * decode token with key
   * map against local database
   * return the user
   */
  const currentUser = await User.findOne({ where: { id: 1 } });
  req.currentUser = currentUser as UserModel;
  next();
}
