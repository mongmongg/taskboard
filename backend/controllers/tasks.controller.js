import { HttpError } from "../models/http-error.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";

const FILTER = (params) => {
  const { uId, bId, tId } = params;
  return { _id: uId, "boards._id": bId, "boards.task._id": tId };
};
async function getTask(req, res, next) {
  let userData;
  try {
    userData = await User.findOne(FILTER(req.params), { "boards.task.$": 1 });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later",
      500,
    );
    return next(error);
  }

  if (!userData && userData.boards.length <= 0) {
    return next(new HttpError("Could not find a task from provided id"));
  }
  const matchedData = userData.boards[0];
  const taskData = matchedData.task.id(req.params.tId);
  res.json({ message: "Get task by Id", task: taskData });
}
async function createTask(req, res, next) {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your inputs", 422));
  }
  const { uId, bId, status } = req.params;
  const { title, description } = req.body;
  const newTask = {
    title,
    description,
    status,
  };
  let taskData;
  try {
    taskData = await User.findOneAndUpdate(
      { _id: uId, "boards._id": bId },
      { $push: { "boards.$.task": newTask } },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create new task, please try again later",
      500,
    );
    return next(error);
  }

  res.status(201).json({ message: "created" });
}

async function updateTask(req, res, next) {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your inputs", 422));
  }
  const { uId, bId, tId } = req.params;
  const { title, description, status } = req.body;
  const updateFields = {};
  if (title !== undefined) {
    updateFields["boards.$[b].task.$[t].title"] = title;
  }
  if (description !== undefined) {
    updateFields["boards.$[b].task.$[t].description"] = description;
  }
  if (status !== undefined) {
    updateFields["boards.$[b].task.$[t].status"] = status;
  }
  if (Object.keys(updateFields).length === 0) {
    return res.status(422).json({ message: "Invalid data update" });
  }

  let updatedtaskData;
  try {
    updatedtaskData = await User.findOneAndUpdate(
      FILTER(req.params),
      { $set: updateFields },
      {
        arrayFilters: [{ "b._id": bId }, { "t._id": tId }],
        returnDocument: "after",
        projection: { boards: { $elemMatch: { _id: bId } } },
      },
    );
    res
      .status(201)
      .json({ message: "updated", boards: updatedtaskData.boards });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update task, please try again later",
      500,
    );
    console.log(err);
    return next(error);
  }
}
async function deleteTask(req, res, next) {
  const { uId, bId, tId } = req.params;
  let taskData;
  try {
    taskData = await User.updateOne(
      { _id: uId, "boards._id": bId },
      { $pull: { "boards.$.task": { _id: tId } } },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete task, please try again later",
      500,
    );
    return next(error);
  }

  res.status(201).json({ message: "deleted" });
}

export { getTask, createTask, updateTask, deleteTask };
