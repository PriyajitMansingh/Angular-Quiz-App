import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsBySubject,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/isAdmin.js";

const router = express.Router();
router.use(authMiddleware);

// Admin-only routes
router.post("/", adminOnly, createQuestion);
router.put("/:id", adminOnly, updateQuestion);
router.delete("/:id", adminOnly, deleteQuestion);

// Public routes
router.get("/", getQuestions);
router.get("/subject/:subjectId", getQuestionsBySubject);
router.get("/:id", getQuestion);

export default router;
