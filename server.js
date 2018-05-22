'use strict';

const Koa = require('koa');
const logger = require('koa-logger');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
require('dotenv').config();

const errorHandler = require('./middlewares/error.handler');
require('./db');

const router = require('./router');

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());

app.use(errorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(compress());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});