import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    status: { type: String, require: true },
  },
  { timestamps: true },
);

export { taskSchema };
