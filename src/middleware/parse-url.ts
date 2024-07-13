import { NextFunction, Request, Response } from 'express';
import whatwg from 'whatwg-url';

export const parseUrlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalUrl = req.body.url as string;

  if (originalUrl) {
    try {
      const parsedUrl = whatwg.parseURL(originalUrl);
      const newUrl = whatwg.serializeURL(parsedUrl!, true);
      req.body.url = newUrl;
    } catch (error) {
      req.body.url = originalUrl;
    }
  }

  next();
};
