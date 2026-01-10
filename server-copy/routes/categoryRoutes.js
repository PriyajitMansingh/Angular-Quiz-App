import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/isAdmin.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", adminOnly, createCategory);
router.get("/", getCategories);
router.put("/:id", adminOnly, updateCategory);
router.delete("/:id", adminOnly, deleteCategory);

export default router;
