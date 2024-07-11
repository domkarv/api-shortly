import express from "express";
import { urlRouter } from "./routes/url.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", urlRouter);

export default app;
