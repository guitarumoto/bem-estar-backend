import { body, query } from 'express-validator';

export const createMoodValidation = [
  body('mood')
    .isInt({ min: 1, max: 5 })
    .withMessage('Humor deve ser um número entre 1 e 5')
    .notEmpty()
    .withMessage('Humor é obrigatório'),
  
  body('note')
    .optional()
    .isString()
    .withMessage('Nota deve ser uma string')
    .isLength({ max: 500 })
    .withMessage('Nota deve ter no máximo 500 caracteres'),
  
  body('date')
    .isISO8601()
    .withMessage('Data inválida')
    .notEmpty()
    .withMessage('Data é obrigatória')
];

export const updateMoodValidation = [
  body('mood')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Humor deve ser um número entre 1 e 5'),
  
  body('note')
    .optional()
    .isString()
    .withMessage('Nota deve ser uma string')
    .isLength({ max: 500 })
    .withMessage('Nota deve ter no máximo 500 caracteres'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Data inválida')
];

export const getMoodsValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Data inicial inválida'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Data final inválida')
]; 