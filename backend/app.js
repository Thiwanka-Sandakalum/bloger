const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models/Blog');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sequelize sync
sequelize.sync().then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
