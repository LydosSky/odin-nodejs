const path = require('node:path');
const { Pool } = require('pg');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}`,
});

passport.use(
  new LocalStrategy((username, password, done) =>
    pool
      .query('SELECT * from users WHERE username = $1', [username])
      .then((response) => response.rows[0])
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect username' });
        return bcrypt
          .compare(password, user.password)
          .then((match) => ({ match, user }));
      })
      .then(({ match, user }) => {
        if (!match) return done(null, false, { message: 'Incorrect password' });
        return done(null, user);
      })
      .catch((err) => done(err)),
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  pool
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then((response) => response.rows[0])
    .then((user) => done(null, user))
    .catch((err) => done(err)),
);

const app = express();

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index', { user: req.user }));
app.get('/sign-up', (req, res) => res.render('sign-up-form'));
app.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});
app.post('/sign-up', (req, res, next) =>
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPw) =>
      pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
        req.body.username,
        hashedPw,
      ]),
    )
    .then((response) => res.redirect('/'))
    .catch((err) => next(err)),
);
app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
);

app.listen(3000, () => console.log('app listening on port 3000!'));
