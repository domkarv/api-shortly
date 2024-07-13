import { Router } from 'express';
import {
  generateShortUrl,
  handleAnalytics,
  redirectToMainUrl,
} from '../controller/url.js';
import { parseUrlMiddleware } from '../middleware/parse-url.js';

const urlRouter = Router();

urlRouter.post('/short-url', parseUrlMiddleware, generateShortUrl);

urlRouter.get('/analytics/:shortId', handleAnalytics);

urlRouter.get('/:shortId', redirectToMainUrl);

export default urlRouter;
