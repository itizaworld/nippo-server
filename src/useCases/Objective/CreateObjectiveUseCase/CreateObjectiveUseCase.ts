import { Types } from "mongoose";
import { Objective, ObjectiveModel } from "~/models/Objective";
import { User } from "~/models/User";

export class CreateObjectiveUseCase {
  async execute({
    currentUser,
    name,
    description,
  }: Pick<Objective, "name" | "description"> & {
    currentUser: User;
  }): Promise<Objective> {
    const objectiveId = new Types.ObjectId();
    return await ObjectiveModel.create({
      _id: objectiveId,
      name,
      description,
      slug: objectiveId,
      createdUserId: currentUser._id,
      status: "INPROGRESS",
    });
  }
}
