import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import { validateArticle } from "../middlewares/validateArticle.js";
import {
  articleSchema,
  articleUpdateSchema,
} from "../validation/articleValidation.js";

const router = express.Router();

router.post("/", validateArticle(articleSchema), createArticle);

router.get("/", getAllArticles);

router.get("/:id", getArticleById);

router.patch("/:id", validateArticle(articleUpdateSchema), updateArticle);

router.delete("/:id", deleteArticle);

export default router;
