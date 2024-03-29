import flash from 'connect-flash';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { logger, morganMiddleware } from './config/winston';
import { appDataSource } from './data-source';
import './middleware/response/customResponse';
import apiRoutes from './routes/api';
import viewRoutes from './routes/view';

const app = express();

app.use(cors());

app.use(morganMiddleware);

app.use(methodOverride('_method'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false, // don't save session if unmodified
    saveUninitialized: false // don't create session until something stored
  })
);

app.use(flash());

app.use('/api', apiRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.enable('trust proxy');

// Set View Engine - EJS template
app.set('view-engine', 'ejs');
// View engine directory
app.set('views', path.resolve(__dirname, './views'));
// Serve static files from template
app.use(express.static(__dirname + '/template'));
// Set View routes
app.use('/', viewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const message = `server running on port ${PORT}`;

  logger.info(message);
});

// DB status
(async () => {
  try {
    await appDataSource.initialize();
    const message = 'database ok';

    logger.info(message);
  } catch (e) {
    console.log(e);

    const message = 'database connection failed!';

    logger.error(message);
  }
})();
