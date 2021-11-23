import express, { Application } from "express";
import cors from "cors";
import http from "http";
import logger from "./app/utils/logger";
import { initRoutes } from "./app/routes";
import initializeSentry from "./sentry";
import { assertDatabaseConnectionOk } from "./app/db";
import exceptionHandler from "./app/middlewares/exceptionHandler";
import invalidRouteHandler from "./app/middlewares/invalidRouteHandler";

const port = process.env.PORT || 3000;
const app = express();

initializeSentry();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("method-override")());
initRoutes(app);
app.use(exceptionHandler);
app.use(invalidRouteHandler);

async function init(app: Application) {
  await assertDatabaseConnectionOk();
  const httpServer = http.createServer(app);

  httpServer.listen(port, () => logger.info(`App started on port ${port}`));
}

init(app);
