import express from "express";
import storage from "../middleware/uploadMiddlware.js";
import {
  addComment,
  addPost,
  deletePost,
  fetchById,
  fetchPost,
  toggleLike,
  updatePost,
} from "../controllers/postController.js";
import { adminOnly, verifyToken } from "../middleware/authmiddleware.js";

const postRouter = express.Router();

postRouter.get("/", fetchPost); // public fetch
postRouter.post("/", verifyToken, adminOnly, addPost);
postRouter.get("/:id", fetchById); // public fetch
postRouter.put("/:id", verifyToken, adminOnly, updatePost);
postRouter.delete("/:id", verifyToken, adminOnly, deletePost);

postRouter.put("/:id/like", verifyToken, toggleLike);
postRouter.post("/:id/comment", verifyToken, addComment);

export default postRouter;
