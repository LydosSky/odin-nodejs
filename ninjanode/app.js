const express = require('express');

const app = express();

app.listen(3000);

app.get('/', function getHomeCB(req, res) {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', function getAboutCB(req, res) {
  res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/about-us', function redirectCB(req, res) {
  res.redirect('/about');
});

app.use(function notFoundCB(req, res) {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
