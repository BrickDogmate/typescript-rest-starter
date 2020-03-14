if (process.env.DOT_ENV_PATH) {
  require('dotenv').config({ path: process.env.DOT_ENV_PATH });
}

import * as express from 'express';
import { configDb } from './configDb';
import { configExpress } from './configExpress';
import { configApi } from './configApi';
import { configError } from './configError';

const PORT: number = +process.env.PORT || 8000;
const app: express.Application = express();

configDb();
configExpress(app);
configApi(app);
configError(app);

const server = app.listen(PORT, (): void => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

module.exports = server;