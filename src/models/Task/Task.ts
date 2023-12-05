import { Schema, model, Types } from "mongoose";

export interface Task {
  _id: string;
  title: string;
  body: string;
  createdUserId: Types.ObjectId;
  objectiveId: Types.ObjectId;
  dueDate: Date; // 対応日時
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Task>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    objectiveId: {
      type: Schema.Types.ObjectId,
      ref: "Objective",
      required: true,
    },
    dueDate: { type: Date, required: true, unique: true },
  },
  { timestamps: true },
);

export const TaskModel = model<Task>("Task", schema);
