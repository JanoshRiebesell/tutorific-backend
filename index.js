'use-strict';

const Koa = require('koa');
const logger = require('koa-logger');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
require('dotenv').config()

const router = require('./router');

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(compress());

if (!module.parent) {
  const ip = process.env.ip || 'localhost';
  const port = process.env.port || 3000;
  app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
  });
}