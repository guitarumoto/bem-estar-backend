import { Router } from 'express';
import { MoodController } from '../controllers/MoodController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { createMoodValidation, updateMoodValidation } from '../validations/moodValidations';

const router = Router();
const moodController = new MoodController();

// @ts-expect-error
router.post('/', authenticate, validate(createMoodValidation), (req, res, next) => {
  moodController.createMood(req, res).catch(next);
});
router.get('/', authenticate, (req, res, next) => {
  moodController.getMoods(req, res).catch(next);
});
router.get('/today', authenticate, (req, res, next) => {
  moodController.getTodayMood(req, res).catch(next);
});
// @ts-expect-error
router.patch('/:id', authenticate, validate(updateMoodValidation), (req, res, next) => {
  moodController.updateMood(req, res).catch(next);
});
router.delete('/:id', authenticate, (req, res, next) => {
  moodController.deleteMood(req, res).catch(next);
});

export default router; 