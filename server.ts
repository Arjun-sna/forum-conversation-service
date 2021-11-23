require("./envConfigLoader")(process.env.NODE_ENV);

import express, { Response, Request, Application } from "express";
import cors from "cors";
import http from "http";
import logHelper from "./app/utils/logger";
import routes from "./app/routes";
import initializeSentry from "./sentry";
import { assertDatabaseConnectionOk } from "./app/db";

const logger = logHelper.makeLogger("SERVER");
const port = process.env.PORT || 3000;
const app = express();

initializeSentry();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("method-override")());
require("./dbHooks");
require("./app/cron");

// Add api routes
routes(app);

// catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
  res.status(404).send({
    error: "Page Not Found",
  });
});

async function init(app: Application) {
  await assertDatabaseConnectionOk();
  const httpServer = http.createServer(app);

  httpServer.listen(port, () => logger.info(`App started on port ${port}`));
}

init(app);
