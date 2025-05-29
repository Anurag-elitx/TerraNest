const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('./config/passport');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const actionRoutes = require('./routes/actionRoutes');
const userActionRoutes = require('./routes/userActionRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const postRoutes = require('./routes/postRoutes');
const organizationRoutes = require('./routes/organizationRoutes');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'terranest_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TerraNest API' });
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/user-actions', userActionRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/organizations', organizationRoutes);


app.use(errorHandler);

module.exports = app;
