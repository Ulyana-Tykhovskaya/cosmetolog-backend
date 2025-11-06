import Joi from "joi";
const allowedTypes = ["medycyna", "depilacja_man", "depilacja_woman"];
export const serviceSchema = Joi.object({
  pl: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "pl.name должно быть строкой",
      "any.required": "pl.name обязательно",
    }),
    description: Joi.string().allow("").optional(),
  }).required(),
  de: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "de.name должно быть строкой",
      "any.required": "de.name обязательно",
    }),
    description: Joi.string().allow("").optional(),
  }).required(),
  price: Joi.number().positive().optional(),
  type: Joi.string()
    .valid(...allowedTypes)
    .required()
    .messages({
      "any.only": `type должен быть одним из: ${allowedTypes.join(", ")}`,
    }),
  imgs: Joi.array().items(Joi.string().uri()).optional(),
});
