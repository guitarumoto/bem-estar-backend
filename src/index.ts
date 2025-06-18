import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import moodRoutes from './routes/moodRoutes';
import goalRoutes from './routes/goalRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Muitas requisições realizadas, tente novamente em 15 minutos',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({
      error: 'Muitas requisições realizadas, tente novamente em 15 minutos',
      retryAfter: '15 minutes',
    });
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Muitas tentativas de autenticação, tente novamente em 15 minutos',
  },
  skipSuccessfulRequests: true,
  handler: (_, res) => {
    res.status(429).json({
      error: 'Muitas tentativas de autenticação, tente novamente em 15 minutos',
    });
  },
});

const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    error: 'Muitas criações em pouco tempo, aguarde um momento',
  },
  handler: (_, res) => {
    res.status(429).json({
      error: 'Muitas criações em pouco tempo, aguarde um momento',
    });
  },
});

app.use(generalLimiter);

app.use(
  express.json({
    limit: '10mb',
    type: 'application/json',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

app.get('/', (_, res) => {
  res.json({
    message: 'API Ok!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.get('/health', (_, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/users', authLimiter, userRoutes);
app.use('/api/moods', createLimiter, moodRoutes);
app.use('/api/goals', createLimiter, goalRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, _) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Erro interno:', err);

    if (res.headersSent) {
      return next(err);
    }

    res.status(500).json({
      error: 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { details: err.message }),
    });
  }
);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
