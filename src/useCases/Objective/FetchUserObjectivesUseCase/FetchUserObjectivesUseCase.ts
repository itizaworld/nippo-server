import { Objective, ObjectiveModel } from "~/models/Objective";

export class FetchUserObjectivesUseCase {
  async execute({ userId }: { userId: string }): Promise<Objective> {
    return await ObjectiveModel.findOne({
      createdUserId: userId,
    });
  }
}
