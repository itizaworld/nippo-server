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
    return await TaskModel.create({
      _id: objectiveId,
      title,
      body,
      objectiveId,
      createdUserId: currentUser._id,
      dueDate,
    });
  }

  async update({
    updates,
    taskId,
    currentUser,
  }: {
    updates: {
      title: string;
      body: string;
      dueDate: Date;
    };
    taskId: string;
    currentUser: User;
  }): Promise<void> {
    await TaskModel.updateOne(
      {
        _id: taskId,
        createdUserId: currentUser._id,
      },
      {
        updates,
      },
    );
  }
}
