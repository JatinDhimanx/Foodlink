const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

const app = express();

// Middleware
// In your backend server.js
app.use(express.static('foodlink/frontend/public')); // Put these HTML files in a 'public' folder
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../frontend/public')));
app.use(express.static(path.join(__dirname, '../../frontend')));

// Base route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
