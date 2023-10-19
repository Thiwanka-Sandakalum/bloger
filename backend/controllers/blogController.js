const Blog  = require('../models/Blog');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await Blog.create({ title, content, author });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Blog.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Blog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const [rowsUpdated] = await Blog.update(req.body, {
      where: { id: req.params.id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Find the updated post
    const updatedPost = await Blog.findOne({
      where: { id: req.params.id },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const deletedCount = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
