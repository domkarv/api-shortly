import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URI } from "../model/url.js";
import { PORT } from "../constant.js";

const generateShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const existingUrl = await URI.findOne({ redirectUrl: url });
    const baseUrl = `${req.protocol}://${req.hostname}:${PORT}`;

    if (existingUrl) {
      return res.json({
        message: "URL already shortened!",
        shortUrl: `${baseUrl}/${existingUrl.shortId}`,
      });
    }

    const shortId = nanoid(8);
    await URI.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.json({
      shortUrl: `${baseUrl}/${shortId}`,
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while adding url into database");
  }
};

const redirectToMainUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;

  if (!shortId) return res.status(400).json({ error: "Invallid URL" });

  try {
    const urlData = await URI.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!urlData) return res.status(404).json({ error: "URL Not Found" });

    res.redirect(urlData.redirectUrl);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while updating url into database");
  }
};

export { generateShortUrl, redirectToMainUrl };
