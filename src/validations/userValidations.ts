import { body } from "express-validator";

export const createUserValidation = [
  body("name")
    .isString()
    .withMessage("Nome deve ser uma string")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nome deve ter entre 3 e 100 caracteres"),

  body("email")
    .isEmail()
    .withMessage("Email inválido")
    .notEmpty()
    .withMessage("Email é obrigatório"),

  body("password")
    .isString()
    .withMessage("Senha deve ser uma string")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
];

export const updateUserValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Nome deve ser uma string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nome deve ter entre 3 e 100 caracteres"),
];
