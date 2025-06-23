// server.js – entrypoint used inside the container
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const port = process.env.PORT || 3000;
const app  = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res, parse(req.url, true))).listen(port, () => {
    console.log(`🚀 nexterino listening on ${port}`);
  });
});
