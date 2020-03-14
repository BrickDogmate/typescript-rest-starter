import * as express from 'express';
import { Server } from 'typescript-rest';
import { HelloController } from './controllers/HelloController';
import { UserController } from './controllers/UserController';

const controllers = [
  HelloController,
  UserController,
]

export function configApi(app: express.Application): void {
  const apis: express.Router = express.Router();
  Server.buildServices(apis, ...controllers);
  app.use('/api', apis);
}
