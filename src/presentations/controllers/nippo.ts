import * as express from "express";
import { User } from "~/models/User";
import { CreateNippoUseCase } from "~/useCases/Nippo/CreateNippoUseCase";

const createNippoUseCase = new CreateNippoUseCase();

export const postNippo = async (
  req: express.Request & { user: User },
  res: express.Response,
) => {
  const { user } = req;
  const { body, objectiveId } = req.body;

  if (!body || !objectiveId) {
    return res.status(400).send({ message: "bodyとobjectiveIdは必須です" });
  }

  try {
    const createdObject = await createNippoUseCase.execute({
      currentUser: user,
      body: req.body.body,
      objectiveId: req.body.objectiveId,
    });
    return res.status(200).json({ object: createdObject });
  } catch (error) {
    return res.status(503).send({ message: "予期せぬエラーが発生しました" });
  }
};
