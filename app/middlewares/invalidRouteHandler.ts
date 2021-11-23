import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send({ error: "Route not found" });
}
