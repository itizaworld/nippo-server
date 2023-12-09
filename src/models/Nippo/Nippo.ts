import { PaginateModel, Schema, Types, model } from "mongoose";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Nippo {
  _id: string;
  body: string;
  date: string; // YYYY-MM-DD 形式で保持する日付
  objectiveId: Types.ObjectId;
  createdUserId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Nippo>(
  {
    body: { type: String, required: true },
    date: { type: String, required: true },
    objectiveId: {
      type: Schema.Types.ObjectId,
      ref: "Objective",
      required: true,
    },
    createdUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
schema.index({ date: 1, objectiveId: 1 }, { unique: true });
schema.plugin(paginate);

interface Document extends mongoose.Document {}

export const NippoModel = model<Document, PaginateModel<Document>>(
  "Nippo",
  schema,
);
