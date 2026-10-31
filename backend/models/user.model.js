import mongoose from "mongoose";
import { boardSchema } from "./board.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      require: true,
      default: {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
      },
    },
    email: { type: String, require: true },
    password: { type: String, require: true },
    boards: [boardSchema],
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export { User };
