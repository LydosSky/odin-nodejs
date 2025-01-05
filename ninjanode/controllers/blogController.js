const Blog = require('../models/blog');

function getBlogs(req, res) {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(function findSuccess(result) {
      res.render('blogs/index', { title: 'All Blogs', blogs: result });
    })
    .catch(function findError(err) {
      console.log(err);
    });
}
function addBlog(req, res) {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(function saveSuccess(result) {
      res.redirect('/');
    })
    .catch(function saveError(err) {
      console.log(err);
    });
}

function blogCreate(req, res) {
  res.render('blogs/create', { title: 'Create a new Blog' });
}

function getBlog(req, res) {
  const id = req.params.id;
  Blog.findById(id)
    .then(function findSuccess(result) {
      res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch(function findError(err) {
      res.status(404).render('404', { title: 'Blog not found' });
    });
}

function deleteBlog(req, res) {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(function deleteSuccess(result) {
      res.json({ redirect: '/blogs' });
    })
    .catch(function deleteError(err) {
      console.log(err);
    });
}

module.exports = {
  getBlogs,
  addBlog,
  blogCreate,
  getBlog,
  deleteBlog,
};
