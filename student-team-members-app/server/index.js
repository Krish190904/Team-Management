const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const memberRoutes = require('./routes/memberRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/members', memberRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
