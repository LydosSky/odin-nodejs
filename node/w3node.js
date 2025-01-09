const http = require('http');
const dt = require('./mymodule');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`The date and the time are currently ${dt.myDateTime()}`);

    res.end();
  })
  .listen(8080);
