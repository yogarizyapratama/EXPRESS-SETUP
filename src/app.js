import express from 'express'
import createError from 'http-errors';
import morgan from 'morgan';
import 'dotenv/config';
import {routes} from './routes/index.js'
import bodyParser from "body-parser";
import cors from "cors";
import { logger } from "./config/logger.js";

const app = express();

//  connect mongodb
import { db } from './config/database.js'

//  parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(morgan('dev'));

routes(app);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`🚀 @ http://localhost:${PORT}`));
