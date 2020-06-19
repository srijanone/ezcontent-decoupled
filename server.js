const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
require('dotenv').config();

app.prepare()
  .then(() => {
    const server = express();

    server.all('*', (req, res) => {
      if (req.originalUrl === '/logo.svg' || req.originalUrl === '/css/combine.css'){
        return handle(req, res)
      }else{
        return app.render(req, res, '/index', req.query)
      }
    })

    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })