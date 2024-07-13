import cors from 'cors';
import express from 'express';
import uiRouter from './routes/ui.js';
import urlRouter from './routes/url.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', uiRouter);
app.use('/', urlRouter);

export default app;
