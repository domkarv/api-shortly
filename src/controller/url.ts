import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { URI } from '../model/url.js';
import { PORT } from '../constant.js';
import whatwg from 'whatwg-url';

const generateShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  const parsedUrl = whatwg.parseURL(url);

  if (parsedUrl?.host == req.hostname) {
    return res.render('index', {
      error: 'Invalid URL',
    });
  }

  const baseUrl = `${req.protocol}://${req.hostname}:${PORT}`;

  const existingUrl = await URI.findOne({ redirectUrl: url });

  if (existingUrl) {
    return res.render('index', {
      message: 'URL already shortened!',
      shortUrl: `${baseUrl}/${existingUrl.shortId}`,
    });
  }

  try {
    const shortId = nanoid(8);
    await URI.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.render('index', {
      shortUrl: `${baseUrl}/${shortId}`,
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while adding url into database');
  }
};

const redirectToMainUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;

  if (!shortId) return res.status(400).json({ error: 'Invallid URL' });

  try {
    const urlData = await URI.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
    );

    if (!urlData) return res.status(404).json({ error: 'Invallid URL' });

    res.redirect(urlData.redirectUrl);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while updating url into database');
  }
};

const handleAnalytics = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;

  const urlData = await URI.findOne({ shortId });

  if (!urlData) return res.status(404).json({ error: 'Invalid URL' });

  return res.json({
    visitCount: urlData.visitHistory.length,
    visitAnalytics: urlData.visitHistory,
  });
};

export { generateShortUrl, redirectToMainUrl, handleAnalytics };
