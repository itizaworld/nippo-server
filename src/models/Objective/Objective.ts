import { Schema, model } from "mongoose";

export interface Objective {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdUserId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Objective>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdUserId: { type: String, ref: "User", required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const ObjectiveModel = model<Objective>("Objective", schema);
