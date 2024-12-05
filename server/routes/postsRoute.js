import express from "express";
import {
  crateNewPost,
  getPosts,
  getPostById,
  deletePostById,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/cratePost", verifyToken, crateNewPost);

router.get("/", getPosts);

router.get("/byId/:id", getPostById);

router.delete("/byId/:id", verifyToken, deletePostById);

export default router;
