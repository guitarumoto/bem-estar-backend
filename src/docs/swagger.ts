import { config } from 'dotenv';

config();

const swaggerSpec = {
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
  paths: {
    "/users": {
      "post": {
        "summary": "Cria um novo usuário",
        "tags": ["Usuários"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name", "email", "password"],
                "properties": {
                  "name": { "type": "string", "example": "João da Silva" },
                  "email": { "type": "string", "example": "joao@email.com" },
                  "password": { "type": "string", "example": "senhaSegura123" }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Usuário criado com sucesso",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Usuario" }
              }
            }
          },
          "500": { "description": "Erro ao criar usuário" }
        }
      },
      "get": {
        "summary": "Retorna os dados do usuário autenticado",
        "tags": ["Usuários"],
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "200": {
            "description": "Dados do usuário",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Usuario" }
              }
            }
          },
          "401": { "description": "Não autorizado" },
          "404": { "description": "Usuário não encontrado" }
        }
      },
      "put": {
        "summary": "Atualiza os dados do usuário autenticado",
        "tags": ["Usuários"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "nome": { "type": "string" },
                  "email": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "204": { "description": "Usuário atualizado com sucesso" },
          "401": { "description": "Não autorizado" },
          "500": { "description": "Erro ao atualizar usuário" }
        }
      }
    },
    "/goals": {
      "post": {
        "summary": "Cria uma nova meta",
        "tags": ["Metas"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["title", "deadline"],
                "properties": {
                  "title": { "type": "string" },
                  "deadline": { "type": "string", "format": "date-time" }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Meta criada com sucesso",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Meta" }
              }
            }
          },
          "401": { "description": "Não autorizado" },
          "500": { "description": "Erro ao criar meta" }
        }
      },
      "get": {
        "summary": "Lista as metas do usuário autenticado",
        "tags": ["Metas"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          {
            "in": "query",
            "name": "completed",
            "schema": { "type": "boolean" },
            "description": "Filtrar por status de conclusão"
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de metas",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Meta" }
                }
              }
            }
          },
          "401": { "description": "Não autorizado" }
        }
      }
    },
    "/goals/{id}": {
      "put": {
        "summary": "Atualiza uma meta",
        "tags": ["Metas"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          { "in": "path", "name": "id", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": { "type": "string" },
                  "deadline": { "type": "string", "format": "date-time" },
                  "completed": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": {
          "204": { "description": "Meta atualizada com sucesso" },
          "401": { "description": "Não autorizado" },
          "500": { "description": "Erro ao atualizar meta" }
        }
      },
      "delete": {
        "summary": "Deleta uma meta",
        "tags": ["Metas"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          { "in": "path", "name": "id", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Meta deletada com sucesso" },
          "401": { "description": "Não autorizado" },
          "500": { "description": "Erro ao deletar meta" }
        }
      }
    },
    "/moods": {
      "post": {
        "summary": "Registra um novo humor",
        "description": "Cria um novo registro de humor para o dia atual. Se já existir um registro para hoje, retorna erro 409.",
        "tags": ["Humores"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["mood"],
                "properties": {
                  "mood": { "type": "integer", "example": 3 },
                  "note": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Humor registrado com sucesso",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Humor" }
              }
            }
          },
          "401": { "description": "Não autorizado" },
          "409": {
            "description": "Já existe um registro de humor para hoje",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Já existe um registro de humor para hoje. Use o endpoint de atualização para modificar o registro existente."
                    }
                  }
                }
              }
            }
          },
          "500": { "description": "Erro ao registrar humor" }
        }
      },
      "get": {
        "summary": "Lista os registros de humor do usuário autenticado",
        "tags": ["Humores"],
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "200": {
            "description": "Lista de humores",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Humor" }
                }
              }
            }
          },
          "401": { "description": "Não autorizado" }
        }
      }
    },
    "/moods/today": {
      "get": {
        "summary": "Busca o registro de humor do dia de hoje",
        "description": "Retorna o registro de humor criado hoje para o usuário autenticado. Se não houver registro para hoje, retorna 404.",
        "tags": ["Humores"],
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "200": {
            "description": "Humor do dia encontrado",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Humor" },
                "example": {
                  "id": "550e8400-e29b-41d4-a716-446655440000",
                  "userId": "user123",
                  "mood": 4,
                  "note": "Estou me sentindo bem hoje, consegui completar minhas tarefas",
                  "createdAt": "2024-01-15T10:30:00.000Z",
                  "updatedAt": "2024-01-15T10:30:00.000Z"
                }
              }
            }
          },
          "401": { "description": "Não autorizado" },
          "404": {
            "description": "Nenhum registro de humor encontrado para hoje",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Nenhum registro de humor encontrado para hoje"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Erro ao buscar humor do dia",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": { "type": "string", "example": "Erro ao buscar humor do dia" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/moods/{id}": {
      "put": {
        "summary": "Atualiza um registro de humor",
        "tags": ["Humores"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          { "in": "path", "name": "id", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "mood": { "type": "integer", "example": 3 },
                  "note": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "204": { "description": "Humor atualizado com sucesso" },
          "401": { "description": "Não autorizado" },
          "500": { "description": "Erro ao atualizar humor" }
        }
      },
      "delete": {
        "summary": "Deleta um registro de humor",
        "tags": ["Humores"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          { "in": "path", "name": "id", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Humor deletado com sucesso" },
          "401": { "description": "Não autorizado" },
          "403": { "description": "Permissão negada" },
          "500": { "description": "Erro ao deletar humor" }
        }
      }
    }
  },
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

export default swaggerSpec; 