import express from "express";
const router = express.Router({ mergeParams: true });
import { body } from "express-validator";

import {
  getTask,
  updateTask,
  createTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const titleValidator = () => body("title").not().isEmpty();
// //get to open edit task modal
router.get("/:tId", getTask);
//create new task
router.post("/:status", titleValidator(), createTask);
// //patch
router.patch("/:tId", titleValidator(), updateTask);
router.patch("/:tId/drag", updateTask);
router.delete("/:tId", deleteTask);

export default router;
