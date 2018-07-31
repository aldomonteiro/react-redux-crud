import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import { dbConfig } from './config';

const app = express();

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(dbConfig.db);
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
