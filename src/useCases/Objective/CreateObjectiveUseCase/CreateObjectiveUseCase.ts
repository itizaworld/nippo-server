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
    return await ObjectiveModel.create({
      name,
      description,
      createdUserId: currentUser._id,
      status: "INPROGRESS",
    });
  }
}
