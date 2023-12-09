import * as express from "express";
import { User } from "~/models/User";
import { CreateObjectiveUseCase } from "~/useCases/Objective/CreateObjectiveUseCase";
import { RetrieveObjectiveUseCase } from "~/useCases/Objective/RetrieveObjectiveUseCase";
import { FetchUserObjectivesUseCase } from "~/useCases/Objective/FetchUserObjectivesUseCase";
import { FetchObjectiveNipposUseCase } from "~/useCases/Objective/FetchObjectiveNipposUseCase";
import { logger } from "~/utils/logger";
import { RetrieveObjectiveBySlugUseCase } from "~/useCases/Objective/RetrieveObjectiveBySlugUseCase";

const createObjectiveUseCase = new CreateObjectiveUseCase();
const fetchUserObjectivesUseCase = new FetchUserObjectivesUseCase();
const retrieveObjectiveUseCase = new RetrieveObjectiveUseCase();
const retrieveObjectiveBySlugUseCase = new RetrieveObjectiveBySlugUseCase();
const fetchObjectiveNipposUseCase = new FetchObjectiveNipposUseCase();

export const postObjective = async (
  req: express.Request & { user: User },
  res: express.Response,
) => {
  const { user } = req;

  try {
    const createdObjective = await createObjectiveUseCase.execute({
      currentUser: user,
      name: req.body.name,
      description: req.body.description,
    });
    return res.status(200).json({ objective: createdObjective });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};

export const getObjectiveMe = async (
  req: express.Request & { user?: User },
  res: express.Response,
) => {
  const { user } = req;

  try {
    const objective = await fetchUserObjectivesUseCase.execute({
      userId: user?._id,
    });
    return res.status(200).json({ objective });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};

export const getObjective = async (
  req: express.Request<{ id: string }> & {
    user: User;
  },
  res: express.Response,
) => {
  const { id } = req.params;

  try {
    const objective = await retrieveObjectiveUseCase.execute({
      _id: id,
    });
    return res.status(200).json({ objective });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};

export const getObjectiveBySlug = async (
  req: express.Request<{ slug: string }> & {
    user: User;
  },
  res: express.Response,
) => {
  const { slug } = req.params;

  try {
    const objective = await retrieveObjectiveBySlugUseCase.execute({
      slug,
    });
    return res.status(200).json({ objective });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};

export const getObjectiveNippos = async (
  req: express.Request<
    { id: string },
    object,
    object,
    { page?: number; limit?: number }
  > & {
    user: User;
  },
  res: express.Response,
) => {
  const { id } = req.params;

  try {
    const result = await fetchObjectiveNipposUseCase.execute({
      objectiveId: id,
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
    });

    return res.status(200).json({ result });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};
