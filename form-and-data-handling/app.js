const express = require('express');
const path = require('node:path');
const data = require('./utils/mockData.js');
const app = express();
const usersRouter = require('./routes/usersRouter');
const usersStorage = require('./storages/usersStorage');

data.forEach((user) => usersStorage.addUser({ ...user }));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
