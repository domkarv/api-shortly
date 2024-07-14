import { Router } from 'express';
import {
  generateShortUrl,
  handleAnalytics,
  redirectToMainUrl,
} from '../controller/url.js';

const urlRouter = Router();

urlRouter.post('/url', generateShortUrl);

urlRouter.get('/analytics/:shortId', handleAnalytics);

urlRouter.get('/:shortId', redirectToMainUrl);

export default urlRouter;
