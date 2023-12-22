import { Document, Schema, model, Types, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Task extends Document {
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
schema.index({ objectiveId: 1 });
schema.plugin(paginate);

export const TaskModel = model<Task, PaginateModel<Task>>("Task", schema);
