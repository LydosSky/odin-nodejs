const express = require('express');
const app = express();
const blogs = require('./blogs');
const morgan = require('morgan');

app.set('view engine', 'ejs');

app.listen(3000);
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', function getHomeCB(req, res) {
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', function getAboutCB(req, res) {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', function blogCreateCB(req, res) {
  res.render('create', { title: 'Create a new Blog' });
});

app.use(function notFoundCB(req, res) {
  res.status(404).render('404', { title: '404' });
});
