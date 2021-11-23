import { Response } from "express";

function sendErrorResponse(res: Response, code: number, errorMessage: string) {
  res.status(code).send({ error: errorMessage });
}

function handleError(res: Response, error: any) {
  if (error.name === "SequelizeValidationError") {
    sendErrorResponse(res, 422, "Bad request / Missing data.");
  } else {
    sendErrorResponse(res, 500, "Something went wrong.");
  }
}

function toFixed(value: number, digits = 2) {
  return Number(value.toFixed(digits));
}

async function asyncForEach<T>(array: T[], action: any) {
  const results = [];
  for (let index = 0; index < array.length; index++) {
    results.push(action(array[index], index, array));
  }
  return await Promise.all(results);
}

module.exports = {
  sendErrorResponse,
  handleError,
  toFixed,
  asyncForEach,
};
