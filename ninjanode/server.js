const http = require('node:http');
const fs = require('node:fs');
const _ = require('lodash');

const server = http.createServer(function serverCB(req, res) {
  res.setHeader('Content-Type', 'text/html');
  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, function readFileCB(err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', function listenCB() {
  console.log('listening for request on port 3000');
});
