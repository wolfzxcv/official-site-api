import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { createConnection, getConnectionOptions } from 'typeorm';
import { swaggerSpec } from './config/swagger';
import { appLogger } from './middleware/appLogger';
import './middleware/response/customResponse';
import routes from './routes';
import { currentENV, logMessage } from './utils';

const app = express();

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(appLogger);

app.enable('trust proxy');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const message = `server running on port ${PORT}`;

  logMessage(message);
});

(async () => {
  try {
    const options = await getConnectionOptions(currentENV);

    await createConnection({
      ...options,
      name: 'default',
      synchronize: false
    });

    const message = 'database ok';

    logMessage(message);
  } catch (e) {
    console.log(e);

    const message = 'database connection failed!';

    logMessage(message, 'error');
  }
})();
