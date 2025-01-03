const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
const blogs = [
  {
    title: 'Yoshi finds eggs',
    snippet: 'Lorem ipsum dolor sit amet consectetur',
  },
  {
    title: 'Mario finds stars',
    snippet: 'Lorem ipsum dolor sit amet consectetur',
  },
  {
    title: 'How to defeat bowser',
    snippet: 'Lorem ipsum dolor sit amet consectetur',
  },
];

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
