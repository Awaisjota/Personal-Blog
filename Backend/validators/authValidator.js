import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is must be at least 3 charaters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email!")
    .trim()
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is Required!")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email!")
    .trim()
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is Required!"),
];
