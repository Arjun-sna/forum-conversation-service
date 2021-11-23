import { Request, Response } from "express";

export class HealthController {
  static async getHealth(req: Request, res: Response) {
    res.send({
      success: true,
    });
  }
}
