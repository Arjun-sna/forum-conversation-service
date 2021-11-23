import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.printf((info: any) => {
      if (info.moduleName) {
        info.message = `[${info.moduleName}] ${info.message}`;
        delete info.moduleName;
      }

      return info;
    }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "app.log" }),
    new winston.transports.Console({ format: winston.format.json() }),
  ],
});

export default logger;
