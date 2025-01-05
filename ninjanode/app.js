const express = require('express');
const app = express();
const blogs = require('./blogs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

app.get('/add-blog', function addBlogCB(req, res) {
  const blog = new Blog({
    title: 'new post',
    snippet: 'about my new blog',
    body: 'blog body',
  });

  blog
    .save()
    .then(function saveSuccess(result) {
      res.send(result);
    })
    .catch(function saveError(err) {
      console.log(err);
    });
});

app.get('/', function getHomeCB(req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function getBlogsCB(req, res) {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(function findSuccess(result) {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch(function findError(err) {
      console.log(err);
    });
});

app.post('/blogs', function addBlogCB(req, res) {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(function saveSuccess(result) {
      res.redirect('/');
    })
    .catch(function saveError(err) {
      console.log(err);
    });
});

app.get('/blogs/:id', function getBlogCB(req, res) {
  const id = req.params.id;
  Blog.findById(id)
    .then(function findSuccess(result) {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(function findError(err) {
      console.log(err);
    });
});

app.delete('/blogs/:id', function deleteBlogCB(req, res) {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(function deleteSuccess(result) {
      res.json({ redirect: '/blogs' });
    })
    .catch(function deleteError(err) {
      console.log(err);
    });
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
