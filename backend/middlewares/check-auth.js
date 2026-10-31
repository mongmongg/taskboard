import { HttpError } from "../models/http-error.js";
import jwt from "jsonwebtoken";
export const TOKEN_KEY = process.env.TOKEN_SECRET_KEY;

export default function checkAuthToken(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    //const token = req.headers.authorization.split(" ")[1]; //Authorization: "Bearer token"
    const token = req.cookies.jwt;
    if (!token) {
      //Scenario: succedd but no token
      return res.status(401).json({ message: "No token found" });
    }
    const decodedToken = jwt.verify(token, TOKEN_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    //Scenario: authorization headers is not set
    const error = new HttpError(
      "Authentication failed from Invalid token",
      401,
    );
    return next(error);
  }
}
