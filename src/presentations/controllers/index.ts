import * as express from "express";

import { getCurrentUser } from "./user/getCurrentUser";
import {
  getObjective,
  getObjectiveBySlug,
  getObjectiveMe,
  getObjectiveNippos,
  postObjective,
} from "./objective";
import { loginRequired } from "~/middlewares/loginRequired";
import { getNippoByDate, postNippo } from "./nippo";

export const setupExpressRoutes = (express: express.Express): void => {
  express.get("/api/me", getCurrentUser);

  express.post("/api/objectives", loginRequired, postObjective);
  express.get("/api/objectives/me", loginRequired, getObjectiveMe);
  express.get("/api/objectives/:id", getObjective);
  express.get("/api/objectives/slug/:slug", getObjectiveBySlug);

  express.get("/api/objectives/:id/nippos", getObjectiveNippos);
  express.post("/api/objectives/:id/nippos", loginRequired, postNippo);
  express.get("/api/nippos/by-date", getNippoByDate);
};
