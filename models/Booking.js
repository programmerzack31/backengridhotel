// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromDate: Date,
  toDate: Date,
  status: { type: String,  enum: ['booked', 'cancelled'] ,default: 'booked' }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
