import { serviceSchema } from "../validation/serviceValidation.js";

export const validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((err) => err.message),
    });
  }
  next();
};
