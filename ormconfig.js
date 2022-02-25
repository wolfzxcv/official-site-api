module.exports = [
  {
    name: 'development',
    type: 'mysql',
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: ['src/entity/index.ts']
  },
  {
    name: 'production',
    type: 'mysql',
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: ['src/entity/index.ts']
  }
];
