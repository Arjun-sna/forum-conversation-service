import { createLogger, format, Logger, transports } from "winston";
import expressWinston from "express-winston";
import { RequestHandler } from "express";

const { combine, timestamp, label, printf } = format;
const env = process.env.NODE_ENV || "development";

const logTransports = () => {
  switch (env) {
    case "development":
      return [new transports.Console()];
    default:
      return [
        new transports.File({ filename: `${__dirname}/../../logs/${env}.log` }),
      ];
  }
};

const formatter = (tagName: string, includeTS: boolean) =>
  combine(
    label({ label: tagName }),
    timestamp(),
    printf(
      (info) =>
        `[${info.level}]${includeTS ? `:[${info.timestamp}]` : ""} - [${
          info.label
        }]: ${info.message}`
    )
  );

interface ILogHelper {
  makeLogger(tagName: string): Logger;
  getRequestLogger(): RequestHandler;
  getResponseLogger(): RequestHandler;
}

class LogHelper implements ILogHelper {
  static instance: ILogHelper = null;
  private handlers: {
    [key: string]: Logger;
  };

  static getInstance(): ILogHelper {
    if (LogHelper.instance) {
      return LogHelper.instance;
    }
    LogHelper.instance = new LogHelper();
    return LogHelper.instance;
  }

  constructor() {
    this.handlers = {};
    this.makeLogger = this.makeLogger.bind(this);
    this.controllerLogger = this.controllerLogger.bind(this);
    this.getRequestLogger = this.getRequestLogger.bind(this);
    this.getResponseLogger = this.getResponseLogger.bind(this);
  }

  makeLogger(tagName: string): Logger {
    if (this.handlers[tagName]) {
      return this.handlers[tagName];
    }
    this.handlers[tagName] = createLogger({
      transports: logTransports(),
      format: formatter(tagName, env !== "development"),
    });
    return this.handlers[tagName];
  }

  private controllerLogger(tagName: string, message: string) {
    return expressWinston.logger({
      winstonInstance: this.makeLogger(tagName),
      meta: true,
      msg: message,
    });
  }

  getRequestLogger(): RequestHandler {
    const requestLoggerInstance = this.makeLogger("REQUEST");
    return (req, _res, next) => {
      requestLoggerInstance.info(`Started ${req.method}: ${req.url}`);
      return next();
    };
  }

  getResponseLogger() {
    const message =
      "Processed {{req.method}}: {{req.url}} in {{res.responseTime}}ms with {{res.statusCode}}";
    return this.controllerLogger("RESPONSE", message);
  }
}

export default LogHelper.getInstance();
