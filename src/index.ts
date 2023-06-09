import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    server.listen(PORT, () =>
      console.log(`Server Running on: ${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

app.use('/', router());
