import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { pick } from "lodash";
import { ServerError } from "../exceptions/ServerError";

export default (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ServerError(errorMessage, 422));
    }
    Object.assign(req, value);
    return next();
  };