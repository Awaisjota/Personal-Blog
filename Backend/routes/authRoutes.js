import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";
const authRouter = express.Router();

authRouter.post("/register", registerValidation, validate, register);
authRouter.post("/login", loginValidation, validate, login);

export default authRouter;
