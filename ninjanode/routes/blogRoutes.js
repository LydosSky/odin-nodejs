const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.getBlogs);
router.post('/', blogController.addBlog);
router.get('/create', blogController.blogCreate);
router.get('/:id', blogController.getBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
