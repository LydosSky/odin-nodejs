const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('', (req, res) => res.send('Home Page'));
indexRouter.get('/about', (req, res) => res.send('About Page'));
indexRouter.get('/contact', (req, res) => res.send('List of Contacts'));
indexRouter.post('/contact', (req, res) =>
  res.send('You added a new contact or not no way to tell'),
);

module.exports = indexRouter;
