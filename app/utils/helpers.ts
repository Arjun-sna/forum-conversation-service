import { RequestHandler, Response, Request, NextFunction } from "express";

export function sendErrorResponse(
  res: Response,
  code: number,
  errorMessage: string
) {
  res.status(code).send({ error: errorMessage });
}

export function handleError(res: Response, error: any) {
  if (error.name === "SequelizeValidationError") {
    sendErrorResponse(res, 422, "Bad request / Missing data.");
  } else {
    sendErrorResponse(res, 500, "Something went wrong.");
  }
}

export function toFixed(value: number, digits = 2) {
  return Number(value.toFixed(digits));
}

export async function asyncForEach<T>(array: T[], action: any) {
  const results = [];
  for (let index = 0; index < array.length; index++) {
    results.push(action(array[index], index, array));
  }
  return await Promise.all(results);
}

export const catchAsyncController =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
