import * as mongoose from "mongoose";
import { FetchUserObjectivesUseCase } from "./FetchUserObjectivesUseCase";
import { ObjectiveModel } from "~/models/Objective";
import { User, UserModel } from "~/models/User";

describe("FetchUserObjectivesUseCase", () => {
  let user: User;
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/nippo";

    await mongoose.connect(mongoUri).catch((err) => console.log(err.reason));
    user = await UserModel.create({
      username: "テストユーザー",
      email: "hoge@example.com",
    });
    await ObjectiveModel.create({
      name: "test",
      description: "test",
      createdUserId: user._id,
      status: "INPROGRESS",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const useCase = new FetchUserObjectivesUseCase();

  test("成功", async () => {
    const response = await useCase.execute({ userId: user._id });

    expect(response).toEqual(
      expect.objectContaining({
        name: "test",
        description: "test",
        createdUserId: user._id,
        status: "INPROGRESS",
      }),
    );
  });
});
