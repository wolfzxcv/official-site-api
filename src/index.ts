import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { logger, morganMiddleware } from './config/winston';
import './middleware/response/customResponse';
import routes from './routes';

const app = express();

app.use(cors());

app.use(morganMiddleware);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.enable('trust proxy');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const message = `server running on port ${PORT}`;

  logger.info(message);
});
