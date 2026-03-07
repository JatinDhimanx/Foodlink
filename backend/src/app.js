const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Base route
app.get('/', (req, res) => {
  res.send('FoodLink API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
