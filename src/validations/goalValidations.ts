import { body, query } from 'express-validator';

export const createGoalValidation = [
  body('title')
    .isString()
    .withMessage('Título deve ser uma string')
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 3, max: 300 })
    .withMessage('Título deve ter entre 3 e 300 caracteres'),
  body('deadline')
    .isISO8601()
    .withMessage('Data limite inválida')
    .notEmpty()
    .withMessage('Data limite é obrigatória')
];

export const updateGoalValidation = [
  body('title')
    .optional()
    .isString()
    .withMessage('Título deve ser uma string')
    .isLength({ min: 3, max: 300 })
    .withMessage('Título deve ter entre 3 e 300 caracteres'),
  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Data limite inválida')
];

export const getGoalsValidation = [
  query('completed')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Status de conclusão deve ser true ou false')
]; 