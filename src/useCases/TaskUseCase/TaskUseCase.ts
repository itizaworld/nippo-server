import { Task, TaskModel } from "~/models/Task";
import { User } from "~/models/User";

export class TaskUseCase {
  async create({
    currentUser,
    title,
    body,
    objectiveId,
    dueDate,
  }: Pick<Task, "title" | "body" | "objectiveId" | "dueDate"> & {
    currentUser: User;
  }): Promise<Task> {
    return await TaskModel.create({
      _id: objectiveId,
      title,
      body,
      objectiveId,
      createdUserId: currentUser._id,
      dueDate,
    });
  }
}
