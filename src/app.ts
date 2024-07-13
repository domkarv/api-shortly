import cors from 'cors';
import express from 'express';
import uiRouter from './routes/ui.js';
import urlRouter from './routes/url.js';
import path from 'path';

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: false })); // to parse form data

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));

app.use('/', uiRouter);
app.use('/', urlRouter);

export default app;
