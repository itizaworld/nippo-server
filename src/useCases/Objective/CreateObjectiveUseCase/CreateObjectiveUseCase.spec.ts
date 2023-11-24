import * as mongoose from "mongoose";
import { CreateObjectiveUseCase } from "./CreateObjectiveUseCase";
import { ObjectiveModel } from "~/models/Objective";
import { User, UserModel } from "~/models/User";

describe("CreateObjectiveUseCase", () => {
  let user: User;
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/nippo";

    await mongoose.connect(mongoUri).catch((err) => console.log(err.reason));
    user = await UserModel.create({
      username: "テストユーザー",
      email: "hoge@example.com",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const useCase = new CreateObjectiveUseCase();

  test("成功", async () => {
    const response = await useCase.execute({
      currentUser: user,
      name: "タイトル",
      description: "テスト説明",
    });

    const objective = await ObjectiveModel.findById(response._id);

    expect(objective).not.toBeNull();
  });
});
