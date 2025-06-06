import swaggerJSDoc from 'swagger-jsdoc';
import { config } from 'dotenv';

config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Bem Estar API',
    version: '1.0.0',
    description: 'API para monitoramento e gestão de saúde mental de jovens. Documentação completa dos endpoints.'
  },
  servers: [
    {
      url: '/api',
      description: process.env.NODE_ENV === 'production' ? 'Servidor de produção' : 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nome: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Meta: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          title: { type: 'string' },
          deadline: { type: 'string', format: 'date-time' },
          completed: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Humor: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          mood: { type: 'integer' },
          note: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/swagger-endpoints.ts'],
};

export default swaggerJSDoc(options); 