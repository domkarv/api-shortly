import { NextFunction, Request, Response } from "express";

export const parseUrlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalUrl = req.body.url || req.url;

  if (originalUrl) {
    const parsedUrl = new URL(originalUrl);
    req.body.url = parsedUrl.toString().replace(/#.*$/, "");
  }

  next();
};
