const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TerraNest API' });
});

app.use('/3', require('./routes/userRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/actions', require('./routes/actionRoutes'));
app.use('/api/user-actions', require('./routes/userActionRoutes'));
app.use('/api/challenges', require('./routes/challengeRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use(errorHandler);

module.exports = app;
