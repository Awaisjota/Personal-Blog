import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // ✅ send errors array as is
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
