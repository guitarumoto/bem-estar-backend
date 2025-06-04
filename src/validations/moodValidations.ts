import { body } from "express-validator";

export const createMoodValidation = [
  body("mood")
    .isInt({ min: 1, max: 5 })
    .withMessage("Humor deve ser um número entre 1 e 5")
    .notEmpty()
    .withMessage("Humor é obrigatório"),

  body("note")
    .optional()
    .isString()
    .withMessage("Nota deve ser uma string")
    .isLength({ max: 500 })
    .withMessage("Nota deve ter no máximo 500 caracteres"),
];

export const updateMoodValidation = [
  body("mood")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Humor deve ser um número entre 1 e 5"),

  body("note")
    .optional()
    .isString()
    .withMessage("Nota deve ser uma string")
    .isLength({ max: 500 })
    .withMessage("Nota deve ter no máximo 500 caracteres"),
];
