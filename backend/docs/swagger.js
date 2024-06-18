const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Configurações básicas do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend - ReservasCIn',
      version: '1.0.0',
      description: 'Documentação da API utilizando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./api/routes/*.js'], // Caminho para os arquivos de definição das rotas
};

const specs = swaggerJSDoc(options);

module.exports = specs;