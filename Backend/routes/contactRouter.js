import express from "express";
import {
  getContactMsg,
  postContactMsg,
} from "../controllers/contactController.js";
import { adminOnly, verifyToken } from "../middleware/authmiddleware.js";
const contactRouter = express.Router();

contactRouter.post("/", postContactMsg);
contactRouter.get("/", verifyToken, adminOnly, getContactMsg);

export default contactRouter;
