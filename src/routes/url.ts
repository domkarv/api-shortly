import { Router } from "express";
import { generateShortUrl, redirectToMainUrl } from "../controller/url.js";
import { parseUrlMiddleware } from "../middleware/parse-url.js";

const urlRouter = Router();

urlRouter.post("/short-url", parseUrlMiddleware, generateShortUrl);
urlRouter.get("/:shortId", redirectToMainUrl);

export { urlRouter };
