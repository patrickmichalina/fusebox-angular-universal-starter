import * as express from 'express';
import * as mcache from 'memory-cache';
import * as accepts from'accepts';
const { gzipSync } = require('zlib');
const { compressSync } = require('iltorb');
const interceptor = require('express-interceptor');

export const brotli = interceptor((req: express.Request, res: express.Response) => ({
  // don't compress responses with this request header
  isInterceptable: () => (!req.headers['x-no-compression']),
  intercept: (body: any, send: any) => {
    const encodings = new Set(accepts(req).encodings());
    const bodyBuffer = new Buffer(body);
    // url specific key for response cache
    const key = '__response__' + req.originalUrl || req.url;
    let output = bodyBuffer;
    // check if cache exists
    if (mcache.get(key) === null) {
      // check for encoding support
      if (encodings.has('br')) {
        res.setHeader('Content-Encoding', 'br');
        output = compressSync(bodyBuffer);
        mcache.put(key, { output, encoding: 'br' });
      } else if (encodings.has('gzip')) {
        res.setHeader('Content-Encoding', 'gzip');
        output = gzipSync(bodyBuffer);
        mcache.put(key, { output, encoding: 'gzip' });
      }
    } else {
      const { output, encoding } = mcache.get(key);
      if (encodings.has(encoding)) {
        res.setHeader('Content-Encoding', encoding);
        send(output);
        return;
      }
    }
    send(output);
  }
}))
