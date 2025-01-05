const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const DBURI =
  'mongodb+srv://admin:nodepassword@cluster0.houd8.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DBURI)
  .then(function mongoSuccess(result) {
    app.listen(3000);
  })
  .catch(function mongoError(error) {
    console.log(error);
  });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', function getHomeCB(req, res) {
  res.redirect('/blogs');
});

app.get('/about', function getAboutCB(req, res) {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use(function notFoundCB(req, res) {
  res.status(404).render('404', { title: '404' });
});
