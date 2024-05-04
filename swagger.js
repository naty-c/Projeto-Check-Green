const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Documentation for my API with users and places',
    version: "1.0.0"
  },
  host: 'localhost:3033',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKei',
      in: 'header',
      name: 'authorization',
      description: 'Authentication by Token'
    }
  }
};

const outputFile = './src/routes/swagger.json';
const routes = ['./src/routes/routes.js']; 

swaggerAutogen(outputFile, routes, doc);