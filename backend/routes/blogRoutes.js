const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Create a new post
router.post('/posts', blogController.createPost);

// Get all posts
router.get('/posts', blogController.getPosts);

// Get a specific post by ID
router.get('/posts/:id', blogController.getPostById);

// Update a post by ID
router.put('/posts/:id', blogController.updatePost);

// Delete a post by ID
router.delete('/posts/:id', blogController.deletePost);

module.exports = router;
