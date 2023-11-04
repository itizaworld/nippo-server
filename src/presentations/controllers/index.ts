import * as express from "express";

import { getCurrentUser } from "./user/getCurrentUser";

export const setupExpressRoutes = (express: express.Express): void => {
  express.get("/api/me", getCurrentUser);
};
