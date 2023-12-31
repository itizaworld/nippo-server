import * as express from "express";
import { User } from "~/models/User";
import { Types } from "mongoose";
import { logger } from "~/utils/logger";
import { TaskUseCase } from "~/useCases/TaskUseCase";

const taskUseCase = new TaskUseCase();

export const postTask = async (
  req: express.Request<
    object,
    object,
    { title: string; body: string; dueDate: Date; objectiveId: string }
  > & { user: User },
  res: express.Response,
) => {
  const { user } = req;
  const { title, body, dueDate, objectiveId } = req.body;

  if (!title || !body || !dueDate || !objectiveId) {
    return res.status(400).send({ message: "値が不正です" });
  }

  try {
    const createdObject = await taskUseCase.create({
      currentUser: user,
      title,
      body,
      dueDate,
      objectiveId: new Types.ObjectId(objectiveId),
    });
    return res.status(200).json({ object: createdObject });
  } catch (error) {
    logger(error.message, "error");
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};
