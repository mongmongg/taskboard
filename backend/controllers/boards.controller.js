import { HttpError } from "../models/http-error.js";
import { validationResult } from "express-validator";

import { User } from "../models/user.model.js";

//workspace page
async function getUserBoards(req, res, next) {
  const { uId: userId } = req.params;
  let boards;
  try {
    boards = await User.findById(userId, { boards: 1, _id: 0 });
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, please try again later",
      500,
    );
    return next(error);
  }
  if (!boards || boards.length <= 0) {
    const error = new HttpError("Could not find a board for the user id", 404);
    return next(error);
  }

  res.json({ message: "Getting user boards data", boards: boards.boards });
}
//can create every page
async function createBoard(req, res, next) {
  //validation

  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  const { title, description } = req.body;
  const { uId: userId } = req.params;

  const newBoard = {
    title,
    description,
  };
  let boardData;
  try {
    boardData = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { boards: newBoard } },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create new board",
      500,
    );
    return next(error);
  }

  res.status(201).json({ message: "created" });
}

//each board
async function getBoardById(req, res, next) {
  console.log("Getting By Id");
  const { bId: boardId, uId: userId } = req.params;
  let board;
  try {
    board = await User.findOne(
      { _id: userId, "boards._id": boardId },
      { "boards.$": 1, _id: 0 },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not get the data, please try again later",
      500,
    );
    return next(error);
  }

  if (!board) {
    const error = new HttpError(
      "Could not find a board for the provided id",
      404,
    );
    return next(error);
  }
  res.json({ message: "Getting board by id", board: board.boards[0] });
}

async function updateBoard(req, res, next) {
  //create middleware function
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  const { bId: boardId, uId: userId } = req.params;
  const { title, description } = req.body;

  const filter = { _id: userId, "boards._id": boardId };
  const updatedData = {
    $set: { "boards.$.title": title, "boards.$.description": description },
  };
  let updated;
  try {
    updated = await User.findOneAndUpdate(filter, updatedData, {
      returnDocument: "after",
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update, please try again later",
      404,
    );
    return next(error);
  }

  res.status(200).json({ message: "Update", update: updated });
}

async function deleteBoard(req, res, next) {
  const { bId: boardId, uId: userId } = req.params;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { boards: { _id: boardId } } },
      { returnDocument: "after" },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete, please try again later",
      500,
    );
    return next(error);
  }

  res.json({ message: "Board deleted" });
}

export { getUserBoards, getBoardById, createBoard, updateBoard, deleteBoard };
