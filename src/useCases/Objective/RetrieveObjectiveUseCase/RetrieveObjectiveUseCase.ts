import { Objective, ObjectiveModel } from "~/models/Objective";

export class RetrieveObjectiveUseCase {
  async execute({ _id }: { _id: string }): Promise<Objective> {
    return await ObjectiveModel.findById(_id);
  }
}
