import { Response, Request } from 'express';

const getHomePageUI = (req: Request, res: Response) => {
  return res.json({ msg: 'ui' });
};

export { getHomePageUI };
