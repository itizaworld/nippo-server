import * as express from "express";
import { User } from "~/models/User";
import { CreateObjectiveUseCase } from "~/useCases/Objective/CreateObjectiveUseCase";
import { RetrieveObjectiveUseCase } from "~/useCases/Objective/RetrieveObjectiveUseCase";
import { FetchUserObjectivesUseCase } from "~/useCases/Objective/FetchUserObjectivesUseCase";

const createObjectiveUseCase = new CreateObjectiveUseCase();
const fetchUserObjectivesUseCase = new FetchUserObjectivesUseCase();
const retrieveObjectiveUseCase = new RetrieveObjectiveUseCase();

export const setupObjectivesRoutes = (express: express.Express): void => {
  express.post(
    "/api/objectives",
    async (req: express.Request & { user: User }, res: express.Response) => {
      const { user } = req;

      try {
        const createdObject = await createObjectiveUseCase.execute({
          currentUser: user,
          name: req.body.name,
          description: req.body.description,
        });
        return res.status(200).json({ object: createdObject });
      } catch (error) {
        return res
          .status(503)
          .send({ message: "予期せぬエラーが発生しました" });
      }
    },
  );

  express.get(
    "/api/objectives/me",
    async (req: express.Request & { user: User }, res: express.Response) => {
      const { user } = req;

      try {
        const objects = await fetchUserObjectivesUseCase.execute({
          userId: user._id,
        });
        return res.status(200).json({ objects });
      } catch (error) {
        return res
          .status(503)
          .send({ message: "予期せぬエラーが発生しました" });
      }
    },
  );

  express.get(
    "/api/objectives/:id",
    async (
      req: express.Request<object, object, object, { id: string }> & {
        user: User;
      },
      res: express.Response,
    ) => {
      const { id } = req.query;

      try {
        const objects = await retrieveObjectiveUseCase.execute({
          _id: id,
        });
        return res.status(200).json({ objects });
      } catch (error) {
        return res
          .status(503)
          .send({ message: "予期せぬエラーが発生しました" });
      }
    },
  );
};
