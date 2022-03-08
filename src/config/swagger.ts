import swaggerJSDoc from 'swagger-jsdoc';
import packageJson from '../../package.json';

const options = {
  swaggerDefinition: {
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description || packageJson.name
    },
    basePath: '/api/'
  },
  apis: ['./src/routes/v1/index.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
