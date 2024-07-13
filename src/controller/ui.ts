import { Response, Request } from 'express';

const getHomePageUI = (req: Request, res: Response) => {
  return res.render('index');
};

export { getHomePageUI };
