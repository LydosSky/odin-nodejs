const express = require('express');
const path = require('node:path');
const { body, validationResult } = require('express-validator');

const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const indexRouter = require('./routes/indexRouter');

const app = express();
const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
];
const users = ['Rose', 'Cake', 'Biff'];
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { links, users });
});

app.get('/about', function (req, res) {
  res.render('about', { links });
});

app.use(express.static(assetsPath));
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/', indexRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express app -- listening on port ${PORT}!`);
});
