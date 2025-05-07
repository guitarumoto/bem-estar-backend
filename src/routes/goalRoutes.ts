import { Router } from 'express';
import { GoalController } from '../controllers/GoalController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { createGoalValidation, updateGoalValidation, getGoalsValidation } from '../validations/goalValidations';

const router = Router();
const goalController = new GoalController();

// @ts-expect-error
router.post('/', authenticate, validate(createGoalValidation), (req, res, next) => {
  goalController.createGoal(req, res).catch(next);
});
// @ts-expect-error
router.get('/', authenticate, validate(getGoalsValidation), (req, res, next) => {
  goalController.getGoals(req, res).catch(next);
});
// @ts-expect-error
router.patch('/:id', authenticate, validate(updateGoalValidation), (req, res, next) => {
  goalController.updateGoal(req, res).catch(next);
});
router.delete('/:id', authenticate, (req, res, next) => {
  goalController.deleteGoal(req, res).catch(next);
});

export default router; 