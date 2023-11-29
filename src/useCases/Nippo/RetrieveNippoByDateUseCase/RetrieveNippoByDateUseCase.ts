import { Nippo, NippoModel } from "~/models/Nippo";

export class RetrieveNippoByDateUseCase {
  async execute({
    date,
    objectiveId,
  }: {
    date: string;
    objectiveId: string;
  }): Promise<Nippo | null> {
    return await NippoModel.findOne({ date, objectiveId });
  }
}
