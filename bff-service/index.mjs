import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config';

const DEFAULT_PORT = 4000;
const SERVICE_URL_REGEXP = /(.*)_SERVICE_URL$/;

const availableServices = [];
const app = express();

Object.entries(process.env).forEach(([key, target]) => {
  if (!key.match(SERVICE_URL_REGEXP)) {
    return;
  }
  const [, service] = key.match(/(.*)_SERVICE_URL$/);
  const servicePath = `/${service.toLowerCase()}`;
  app.use(
    servicePath,
    createProxyMiddleware({
      target,
      pathRewrite: { [`^${servicePath}`]: '' },
      changeOrigin: true,
      logLevel: process.env.NODE_ENV === 'production' ? 'info' :'debug',
    })
  );
  availableServices.push(servicePath);
});

app.all('*', (req, res, next) => {
  res.status(502).send({
    message: 'Can not process request.',
    availableServices,
  });
});

const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`BFF app is listening on port ${port}`);
})
