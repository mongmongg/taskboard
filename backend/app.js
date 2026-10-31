import express from "express";
import { connectToMongoDB } from "./data/database.js";
import corsMiddleware from "./middlewares/CORS.js";
import cookieParser from "cookie-parser";

import boardsRouter from "./routes/boards.route.js";
import usersRouter from "./routes/users.route.js";
import taskRouter from "./routes/tasks.route.js";
import checkAuthToken from "./middlewares/check-auth.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(corsMiddleware);

app.use(usersRouter);

app.use(checkAuthToken);
app.use("/:uId", boardsRouter);
app.use("/:uId/boards/:bId/task", taskRouter);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const status = error.code || 500;
  const message = error.message || "An unknown error occured";
  res.status(status).json({ message });
});
// connectToMongoDB();

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started");
  });
});

export default app;
