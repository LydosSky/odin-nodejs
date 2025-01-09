const { Router } = require('express');

const bookRouter = Router();

bookRouter.get('/', (req, res) => res.send('All Books'));
bookRouter.get('/:bookId', (req, res) =>
  res.send(`Book with ${req.params.bookId} id`),
);
bookRouter.get('/:bookId/reserve', (req, res) =>
  res.send(`Book with ${req.params.bookId} is reserved`),
);
bookRouter.post('/:bookId/reserve', (req, res) =>
  res.send(`You reserved the book ${req.params.bookId}`),
);

module.exports = bookRouter;
