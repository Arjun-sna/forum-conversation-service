import { Application } from "express";
import http from "http";
import logger from "./app/utils/logger";
import { assertDatabaseConnectionOk } from "./app/db";
import app from "./app";

const port = process.env.PORT || 3000;

async function init(app: Application) {
  await assertDatabaseConnectionOk();
  const httpServer = http.createServer(app);

  httpServer.listen(port, () => logger.info(`App started on port ${port}`));
}

init(app);
