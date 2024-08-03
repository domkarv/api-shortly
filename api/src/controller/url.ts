import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import whatwg from 'whatwg-url';
import { db } from '../db/index.js';
import { analytics, uri } from '../db/schema.js';

const generateShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  const parsedUrl = whatwg.parseURL(url);

  if (!parsedUrl) return res.status(400).json({ error: 'Invalid URL' });

  const newUrl = whatwg.serializeURL(parsedUrl, true);

  if (parsedUrl.host == req.hostname) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const existingUri = await db.query.uri.findFirst({
    where: (uri, { eq }) => eq(uri.mainUrl, newUrl),
  });

  if (existingUri) {
    return res.json({
      message: 'URL already shortened!',
      shortUrlId: existingUri.shortUrlId,
    });
  }

  try {
    const shortUrlId = nanoid(8);

    await db.insert(uri).values({
      shortUrlId: shortUrlId,
      mainUrl: newUrl,
    });

    return res.json({ shortUrlId });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while adding url into database');
  }
};

const redirectToMainUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;

  if (!shortId) return res.status(400).json({ error: 'Invalid URL' });

  try {
    const existingUri = await db.query.uri.findFirst({
      where: (uri, { eq }) => eq(uri.shortUrlId, shortId),
    });

    if (!existingUri) return res.status(404).json({ error: 'Invalid URL' });

    await db.insert(analytics).values({
      uriId: existingUri.shortUrlId,
    });

    return res.redirect(existingUri.mainUrl);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while updating url into database');
  }
};

const handleAnalytics = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;

  if (!shortId) return res.status(400).json({ error: 'Plz provide shortId' });

  const urlData = await db.query.uri.findFirst({
    where: (uri, { eq }) => eq(uri.shortUrlId, shortId),
    with: { analytics: true },
  });

  if (!urlData) return res.status(404).json({ error: 'Invalid URL' });

  return res.json({
    visitCount: urlData.analytics.length,
    visitAnalytics: urlData.analytics,
  });
};

const getAllURLs = async (req: Request, res: Response) => {
  const urlsData = await db.query.uri.findMany({});

  if (!urlsData)
    return res.status(500).json({ error: 'Internal Server Error' });

  return res.json({ urls: urlsData });
};

export { generateShortUrl, redirectToMainUrl, handleAnalytics, getAllURLs };
