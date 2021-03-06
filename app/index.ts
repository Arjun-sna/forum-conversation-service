import express from "express";
import cors from "cors";
import { initRoutes } from "./routes";
import initializeSentry from "./sentry";
import { kafkajs } from "./kafka";
import exceptionHandler from "./middlewares/exceptionHandler";
import invalidRouteHandler from "./middlewares/invalidRouteHandler";
import authMiddleware from "./middlewares/authMiddleware";
import config from "./config";

const app = express();

initializeSentry();

if (config.kafka.enabled) {
  kafkajs();
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("method-override")());
app.use(authMiddleware.unless({ path: ["/api/v1/health"] }));
initRoutes(app);
app.use(exceptionHandler);
app.use(invalidRouteHandler);

export default app;
