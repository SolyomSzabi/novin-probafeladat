import express from 'express';

import { router } from './route/route';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(requestLogger);

app.use(express.json());
app.use(router);

app.use(errorLogger);

export default app;
