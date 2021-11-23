import { Request, Response } from "express";

export async function getHealth(req:Request, res: Response) {
  res.send({
    success: true,
  });
}