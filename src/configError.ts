import * as express from 'express';
import { ERROR_MESSAGE } from './common/ErrorMessages';

export function configError(app: express.Application): void {
  app.use(errorJsonResponse);
  app.use(error404);
}

function error404(req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (res.headersSent) return next();

  res.set('Content-Type', 'application/json');
  res.status(404).json({ error: ERROR_MESSAGE.NOT_FOUND_PATH });
}

function errorJsonResponse(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (res.headersSent) return next();

  if (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
      console.error(err.stack);
    }
    res.set('Content-Type', 'application/json');
    if (!err.statusCode) {
      res.status(500).json({ error: ERROR_MESSAGE.SYSTEM_ERROR });
    } else {
      res.status(err.statusCode).json({ error : err.message });
    }
  } else {
    next();
  }
}