import express from "express";
import { body } from "express-validator";
import {
  createBoard,
  deleteBoard,
  getBoardById,
  getUserBoards,
  updateBoard,
} from "../controllers/boards.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/boards", body("title").not().isEmpty(), createBoard);

router.get("/boards", getUserBoards); //workspace

//each board
router.get("/boards/:bId", getBoardById);
//post request to add tasks
router.post("/boards/:bId", getBoardById);
router.patch("/boards/:bId", body("title").not().isEmpty(), updateBoard);
router.delete("/boards/:bId", deleteBoard);

export default router;
