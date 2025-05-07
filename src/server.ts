import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import moodRoutes from './routes/moodRoutes';
import goalRoutes from './routes/goalRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 