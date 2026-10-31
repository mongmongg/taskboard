import express from "express";
import { body } from "express-validator";
import {
  login,
  signup,
  getUser,
  updateUser,
  deleteUser,
  logout,
  checkVerify,
} from "../controllers/users.controller.js";
import checkAuthToken from "../middlewares/check-auth.js";
const router = express.Router({ mergeParams: true });

const emailValidator = () => body("email").normalizeEmail().isEmail();
const passwordValidator = () => body("password").isLength({ min: 8 });
const firsNameValidator = () => body("firstName").not().isEmpty();
const lastNameValidator = () => body("lastName").not().isEmpty();
//Testing
// router.get("/allboards", getAllBoards); //workspace public

router.post("/login", emailValidator(), passwordValidator(), login);
router.post(
  "/signup",
  firsNameValidator(),
  lastNameValidator(),
  passwordValidator(),
  emailValidator(),
  signup,
);

router.use(checkAuthToken);
//settings
router.get("/user/verify", checkVerify);
router.get("/:uId", getUser);
router.post("/:uId/logout", logout);
router.patch(
  "/:uId/settings",
  firsNameValidator(),
  lastNameValidator(),
  passwordValidator(),
  emailValidator(),
  updateUser,
);
router.delete("/:uId/settings/delete", deleteUser);

export default router;
