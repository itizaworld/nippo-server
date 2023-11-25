import { Nippo, NippoModel } from "~/models/Nippo";

export class FetchObjectiveNipposUseCase {
  async execute({
    objectiveId,
    page,
    limit,
  }: {
    objectiveId: string;
    page: number;
    limit: number;
  }): Promise<Nippo[]> {
    return await NippoModel.find({ objectiveId })
      .skip((page - 1) * limit)
      .limit(limit);
  }
}
