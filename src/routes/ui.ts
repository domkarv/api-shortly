import { Router } from 'express';
import { getHomePageUI } from '../controller/ui.js';

const uiRouter = Router();

uiRouter.get('/', getHomePageUI);

export default uiRouter;
