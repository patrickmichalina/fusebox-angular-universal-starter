import * as express from 'express';

// tslint:disable-next-line:only-arrow-functions
export const forceSsl = function(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};
