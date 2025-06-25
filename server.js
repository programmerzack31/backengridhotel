const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookingroutes');

// Check required env vars
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error('❌ Missing environment variables: PORT or MONGO_URI');
  process.exit(1);
}

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Hotel backend here');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Mongoose successfully connected with Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Backend is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect with Atlas:', err);
    process.exit(1);
  });
