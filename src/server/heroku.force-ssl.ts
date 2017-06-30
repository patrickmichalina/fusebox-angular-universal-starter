import * as express from 'express';

export const forceSsl = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.headers['x-forwarded-proto'] !== 'https' && req.headers.host !== process.env.CDN_ORIGIN) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};
