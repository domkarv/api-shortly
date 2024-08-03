import { Router } from 'express';
import {
  generateShortUrl,
  handleAnalytics,
  redirectToMainUrl,
  getAllURLs,
} from '../controller/url.js';

const urlRouter = Router();

urlRouter.post('/url', generateShortUrl);

urlRouter.get('/analytics/:shortId', handleAnalytics);

urlRouter.get('/all', getAllURLs);

urlRouter.get('/:shortId', redirectToMainUrl);

export default urlRouter;
