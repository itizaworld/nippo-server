import { Nippo, NippoModel } from "~/models/Nippo";
import { ObjectiveModel } from "~/models/Objective";

export class RetrieveNippoByDateUseCase {
  async execute({
    date,
    slug,
  }: {
    date: string;
    slug: string;
  }): Promise<Nippo | null> {
    const objective = await ObjectiveModel.findOne({ slug });

    if (!objective) return;

    return await NippoModel.findOne({ date, objectiveId: objective._id });
  }
}
