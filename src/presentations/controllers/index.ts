import * as express from "express";

import { getCurrentUser } from "./user/getCurrentUser";
import { setupObjectivesRoutes } from "./objective";

export const setupExpressRoutes = (express: express.Express): void => {
  express.get("/api/me", getCurrentUser);
  setupObjectivesRoutes(express);
};
