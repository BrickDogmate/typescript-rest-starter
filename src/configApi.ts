import * as express from 'express';
import { Server } from 'typescript-rest';
import { HelloController } from './controllers/HelloController';
const controllers = [
  HelloController,
]

export function configApi(app: express.Application): void {
  const apis: express.Router = express.Router();
  Server.buildServices(apis, ...controllers);
  app.use('/api', apis);
}
