import { Schema, model, Types } from "mongoose";

export interface Objective {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdUserId: Types.ObjectId;
  status: "INPROGRESS" | "DONE";
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Objective>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const ObjectiveModel = model<Objective>("Objective", schema);
