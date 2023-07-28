import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  Announcement,
  Contact,
  Log,
  News,
  User
} from './config/typeorm/entities';
import { currentENV } from './utils/currentENV';

export const appDataSource = new DataSource({
  type: 'mysql',
  host:
    currentENV === 'production'
      ? process.env.DB_HOST_PROD
      : process.env.DB_HOST_DEV,
  port: Number(process.env.DB_PORT || 39307),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Announcement, Contact, Log, News, User],
  subscribers: [],
  migrations: []
});

appDataSource.initialize();
