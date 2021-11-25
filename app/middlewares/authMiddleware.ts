import { CustomRequest } from "../types";
import { Response, NextFunction } from "express";

export default function (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  req.currentUser = {
    id: 1,
    username: "arjun",
    email: "arj@gmailc.om",
  };
  next();
}
