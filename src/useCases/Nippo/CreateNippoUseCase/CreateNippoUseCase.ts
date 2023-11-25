import { Nippo, NippoModel } from "~/models/Nippo";
import { User } from "~/models/User";

export class CreateNippoUseCase {
  async execute({
    currentUser,
    body,
    objectiveId,
  }: Pick<Nippo, "body" | "objectiveId"> & {
    currentUser: User;
  }): Promise<Nippo> {
    return await NippoModel.create({
      body,
      objectiveId,
      createdUserId: currentUser._id,
    });
  }
}
