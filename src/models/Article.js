import { model, Schema } from "mongoose";

const articleSchema = new Schema(
  {
    pl: {
      title: { type: String, required: true },
      article: { type: String, required: false },
    },
    de: {
      title: { type: String, required: true },
      article: { type: String, required: false },
    },
    img: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ArticleCollection = model("articles", articleSchema);
