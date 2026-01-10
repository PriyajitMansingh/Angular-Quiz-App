import express from "express";
import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  getSubjectsByCategory,
} from "../controllers/subjectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/isAdmin.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", adminOnly, createSubject);
router.get("/", getSubjects);
router.put("/:id", adminOnly, updateSubject);
router.delete("/:id", adminOnly, deleteSubject);
router.get("/category/:categoryId", getSubjectsByCategory);

export default router;
