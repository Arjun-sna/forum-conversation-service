import { ErrorRequestHandler } from "express";

const errorHandlers: ErrorRequestHandler = function (err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
};

export default errorHandlers;
