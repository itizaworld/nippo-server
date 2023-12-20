import { PaginationResult } from "~/models/PaginationResult";
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
  }): Promise<PaginationResult<Task>> {
    const result = await TaskModel.paginate(
      { objectiveId },
      { sort: { dueDate: -1 }, page, limit },
    );

    return new PaginationResult<Task>({
      ...result,
      docs: result.docs.map((doc) => doc.toObject()),
    });
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
    const task = await TaskModel.create({
      title,
      body,
      objectiveId,
      createdUserId: currentUser._id,
      dueDate,
    });

    return task;
  }
}
