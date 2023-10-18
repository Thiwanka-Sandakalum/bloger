// mockApi.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const posts = [
  { id: 1, title: 'First Post', content: 'Lorem ipsum...', author: 'John Doe', date: new Date() },
  { id: 2, title: 'Second Post', content: 'Lorem ipsum...', author: 'Jane Doe', date: new Date() },
];

// Middleware to simulate delay in API responses (for testing loading states)
app.use((req, res, next) => {
  setTimeout(next, 500);
});

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get a specific post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = { id: posts.length + 1, title, content, author, date: new Date() };
  posts.push(newPost);
  res.json(newPost);
});

// Update a post by ID
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPost = req.body;

  const index = posts.findIndex(p => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts[index] = { ...posts[index], ...updatedPost };

  res.json(posts[index]);
});

// Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = posts.splice(index, 1)[0];

  res.json(deletedPost);
});

app.listen(PORT, () => {
  console.log(`Mock API server is running on port ${PORT}`);
});
