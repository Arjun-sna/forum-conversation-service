import express, { Application } from "express";
import cors from "cors";
import http from "http";
import logger from "./utils/logger";
import { initRoutes } from "./routes";
import initializeSentry from "./sentry";
import { assertDatabaseConnectionOk } from "./db";
import exceptionHandler from "./middlewares/exceptionHandler";
import invalidRouteHandler from "./middlewares/invalidRouteHandler";
import authMiddleware from "./middlewares/authMiddleware";

const port = process.env.PORT || 3000;
const app = express();

initializeSentry();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("method-override")());
app.use(authMiddleware);
initRoutes(app);
app.use(exceptionHandler);
app.use(invalidRouteHandler);

export default app;
