import { Nippo, NippoModel } from "~/models/Nippo";
import { User } from "~/models/User";

export class UpsertNippoUseCase {
  async execute({
    currentUser,
    body,
    date,
    objectiveId,
  }: Pick<Nippo, "body" | "date" | "objectiveId"> & {
    currentUser: User;
  }): Promise<Nippo> {
    return await NippoModel.findOneAndUpdate(
      { date, objectiveId, createdUserId: currentUser._id },
      {
        body,
        date,
        objectiveId,
        createdUserId: currentUser._id,
      },
      { new: true, upsert: true },
    );
  }
}
