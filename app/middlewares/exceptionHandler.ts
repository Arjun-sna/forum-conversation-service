import { ErrorRequestHandler } from "express";
import { ServerError } from "../exceptions/ServerError";
import logger from "../utils/logger";

const exceptionHandler: ErrorRequestHandler = function (err, req, res, next) {
  if (err instanceof ServerError) {
    res.status(err.code).send({ error: err.message });
  } else {
    logger.info({
      url: req.url,
      method: req.method,
      queryParams: JSON.stringify(req.query),
      body: JSON.stringify(req.body),
      errorInfo: JSON.stringify(err),
      response_code: 500,
    });
  }
};

export default exceptionHandler;
