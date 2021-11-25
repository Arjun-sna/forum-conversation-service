import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  currentUser: any;
}

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
}
