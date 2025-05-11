import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Flavorly API',
    version: '1.0.0',
    description: 'API documentation for Flavorly',
  },
  servers: [
    {
      url: 'http://flavorly-api-gpdc.onrender.com/api',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*Router.js', './app.js'],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
