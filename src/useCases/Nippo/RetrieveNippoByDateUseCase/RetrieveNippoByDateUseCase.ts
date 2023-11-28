import { Nippo, NippoModel } from "~/models/Nippo";

export class RetrieveNippoByDateUseCase {
  async execute({ date }: { date: string }): Promise<Nippo> {
    return await NippoModel.findOne({ date });
  }
}
