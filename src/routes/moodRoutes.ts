import { Router } from 'express';
import { MoodController } from '../controllers/MoodController';
import { authenticate } from '../middlewares/auth';

const router = Router();
const moodController = new MoodController();

router.post('/', authenticate, moodController.createMood.bind(moodController));
router.get('/', authenticate, moodController.getMoods.bind(moodController));
router.patch('/:id', authenticate, moodController.updateMood.bind(moodController));

export default router; 