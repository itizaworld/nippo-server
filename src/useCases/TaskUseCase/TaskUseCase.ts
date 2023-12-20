import { Task, TaskModel } from "~/models/Task";
import { User } from "~/models/User";

export class TaskUseCase {
  async list({
    objectiveId,
    page,
    limit,
  }: {
    objectiveId: string;
    page: number;
    limit: number;
  }): Promise<Task[]> {
    return await TaskModel.find({ objectiveId })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }
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
      title,
      body,
      objectiveId,
      createdUserId: currentUser._id,
      dueDate,
    });
  }
}
