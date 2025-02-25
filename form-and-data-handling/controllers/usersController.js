const usersStorage = require('../storages/usersStorage');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const genericErr = 'must be valid';
const genericReq = 'is required';
const validateUser = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage(`First name ${genericReq}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage(`Last name ${genericReq}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${genericReq}`)
    .isEmail()
    .withMessage(`Email ${genericErr}`)
    .normalizeEmail(),
  body('age')
    .optional({ checkFalsy: true })
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${genericErr} number between 0 and 120`)
    .toInt(),
  body('bio')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 0, max: 200 })
    .withMessage('Bio must be between 0 and 200 character long'),
];

exports.usersListGet = (req, res) => {
  res.render('index', {
    title: 'User list',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create user',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect('/');
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render('updateUser', {
    title: 'Update user',
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect('/');
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
};

exports.usersSearchGet = (req, res) => {
  const searchUsers = usersStorage.searchUser(req.query.search);
  res.render('index', {
    title: 'User list',
    users: usersStorage.getUsers(),
    searchUsers,
  });
};
