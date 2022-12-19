import { DataSource } from 'typeorm';

import config from '../config';
import { User } from './models/user';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: process.env.DB_DATABASE,
  entities: [User],
  logging: false,
  synchronize: true,
});

appDataSource
  .initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Data source has been initialized.');
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error(`Error during Data Source initialization: ${error}`);
  });
