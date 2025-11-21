import { ArticleCollection } from "../models/Article.js";

export const createArticle = async (req, res, next) => {
  try {
    const { titlePl, titleDe, articlePl, articleDe, img } = req.body;

    const newArticle = {
      pl: { title: titlePl, article: articlePl },
      de: { title: titleDe, article: articleDe },
      img,
    };

    const created = await ArticleCollection.create(newArticle);

    res.status(201).json({
      message: "Article created successfully",
      data: created,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * limit;

    const articles = await ArticleCollection.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await ArticleCollection.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json(article);
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const updated = await ArticleCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Article not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const deleted = await ArticleCollection.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Article not found" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
