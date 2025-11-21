import Joi from "joi";

export const articleSchema = Joi.object({
  titlePl: Joi.string().required(),
  titleDe: Joi.string().required(),
  articlePl: Joi.string().allow(""),
  articleDe: Joi.string().allow(""),
  img: Joi.string().uri().required(),
});

// ❗ схема для PATCH (частичное обновление)
export const articleUpdateSchema = Joi.object({
  titlePl: Joi.string(),
  titleDe: Joi.string(),
  articlePl: Joi.string().allow(""),
  articleDe: Joi.string().allow(""),
  img: Joi.string().uri(),
});
