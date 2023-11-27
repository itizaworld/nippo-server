import { Objective, ObjectiveModel } from "~/models/Objective";

export class RetrieveObjectiveBySlugUseCase {
  async execute({ slug }: { slug: string }): Promise<Objective> {
    return await ObjectiveModel.findOne({ slug });
  }
}
