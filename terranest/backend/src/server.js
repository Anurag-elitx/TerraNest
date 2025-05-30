require('dotenv').config();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/terranest')
  .then(() => {
    console.log('Connected to MongoDB');
    const server = app.listen(PORT,'0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`Server is listening on 0.0.0.0:${PORT}`);
    });
    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});