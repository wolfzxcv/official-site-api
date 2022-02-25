import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import './middleware/response/customResponse';
import routes from './routes';

const app = express();

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(async () => {
  try {
    const options = await getConnectionOptions(
      process.env.NODE_ENV || 'development'
    );

    await createConnection({
      ...options,
      name: 'default',
      synchronize: false
    });
    console.log('database ok');
  } catch (e) {
    console.log(e);
    console.log('database connection failed!');
  }
})();
