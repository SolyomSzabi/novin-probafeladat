import { config } from 'dotenv';

config();

export default {
  port: process.env.SERVER_PORT,
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE,
    port: process.env.DB_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiryTime: process.env.JWT_EXPIRY_TIME,
  },
};
