import { HealthController } from "../controllers";
import { RoutesConfig } from "./type";

const healthRoutesConfig: RoutesConfig = {
  root: "app",
  routes: {
    health: {
      get: HealthController.getHealth,
    },
  },
};

export default healthRoutesConfig;
