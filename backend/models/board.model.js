import mongoose from "mongoose";
import { taskSchema } from "./task.model.js";
const boardSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    task: [taskSchema],
  },
  { timestamps: true },
);
export { boardSchema };
