import cors from 'cors';
import express from 'express';
import urlRouter from './routes/url.js';

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: false })); // to parse form data

app.use('/', urlRouter);

export default app;
