import * as express from "express";

import { getCurrentUser } from "./user/getCurrentUser";
import { getObjective, getObjectiveMe, postObjective } from "./objective";
import { loginRequired } from "~/middlewares/loginRequired";

export const setupExpressRoutes = (express: express.Express): void => {
  express.get("/api/me", getCurrentUser);

  express.post("/api/objectives", loginRequired, postObjective);
  express.get("/api/objectives/me", loginRequired, getObjectiveMe);
  express.get("/api/objectives/:id", getObjective);
};
