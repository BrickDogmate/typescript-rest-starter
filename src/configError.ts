import * as express from 'express';
import { ERROR_MESSAGE } from './common/ErrorMessages';

export function configError(app: express.Application): void {
  app.use(error404);
  app.use(errorJsonResponse);
}

function error404(req: express.Request, res: express.Response): void {
  res.status(404).json({ error: ERROR_MESSAGE.NOT_FOUND_PATH });
}

function errorJsonResponse(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (res.headersSent) {
    return next();
  }

  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack);
  }

  res.set('Content-Type', 'application/json');
  if (!err.statusCode) {
    res.status(500).json({ error: ERROR_MESSAGE.SYSTEM_ERROR });
  } else {
    res.status(err.statusCode).json({ error : err.message });
  }
}