import { Nippo, NippoModel } from "~/models/Nippo";
import { User } from "~/models/User";

export class CreateNippoUseCase {
  async execute({
    currentUser,
    body,
    date,
    objectiveId,
  }: Pick<Nippo, "body" | "date" | "objectiveId"> & {
    currentUser: User;
  }): Promise<Nippo> {
    return await NippoModel.create({
      body,
      date,
      objectiveId,
      createdUserId: currentUser._id,
    });
  }
}
