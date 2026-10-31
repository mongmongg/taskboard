import { HttpError } from "../models/http-error.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const TOKEN_KEY = process.env.TOKEN_SECRET_KEY;

async function login(req, res, next) {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }
  const { email, password } = req.body;

  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500,
    );
    return next(error);
  }
  if (!existUser) {
    const error = new HttpError("Invalid email or password", 401);
    return next(error);
  }
  try {
    const isCorrectPass = await bcrypt.compare(password, existUser.password);
    if (!isCorrectPass) {
      const error = new HttpError("Invalid email or password", 401);
      return next(error);
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Logging in failed, please try again later here",
      500,
    );
    return next(error);
  }
  const token = jwt.sign({ userId: existUser._id, email: email }, TOKEN_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Logged in",
    token,
    userData: { id: existUser._id, email: existUser.email },
  });
}
async function logout(req, res, next) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ message: "Logged out" });
}
async function signup(req, res, next) {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your inputs", 422));
  }

  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  let existedUser;
  try {
    existedUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later",
      500,
    );
    return next(error);
  }
  if (existedUser) {
    const error = new HttpError(
      "This account exists already, please try to login",
      401,
    );
    return next(error);
  }
  const newAccount = new User({
    name: { firstName, lastName },
    email,
    password: hashedPassword, //must be hashed
    boards: [],
  });

  try {
    await newAccount.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please again later", 500);
    return next(error);
  }
  const token = jwt.sign(
    { userId: newAccount._id.toString(), email: email },
    TOKEN_KEY,
    {
      expiresIn: "1h",
    },
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  await res.status(201).json({
    message: "Create New Account",
    userData: { _id: newAccount._id.toString(), email },
    token,
  });
}
async function googleAuth(accessToken, refreshToken, profile, done) {
  const email = profile.emails[0].value;
}

//settings page
async function getUser(req, res, next) {
  const userId = req.params.uId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user",
      500,
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id",
      404,
    );
    return next(error);
  }
  res.json({ message: "Getting user's board", user });
}
async function updateUser(req, res, next) {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your inputs", 422));
  }
  const userId = req.params.uId;
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const updatedData = {
    name: { firstName, lastName },
    email,
    password: hashedPassword,
  };
  let user;
  try {
    user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedData },
      { returnDocument: "after" },
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user",
      500,
    );
    next(error);
  }
  res.status(201).json({ message: "updated", user });
}
async function deleteUser(req, res, next) {
  const userId = req.params.uId;
  try {
    await User.findByIdAndDelete(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user",
      500,
    );
    return next(error);
  }
  res.status(201).json({ message: "deleted account" });
}
function checkVerify(req, res) {
  res.status(200).json({ message: "verified", userId: req.userData.userId });
}

export { getUser, login, signup, updateUser, deleteUser, logout, checkVerify };
