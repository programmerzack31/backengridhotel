const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  capacity: Number,
  amenities: [String],
  available: Boolean,
  description: String,
  image: String,
});
const Room = mongoose.model('Room' , roomSchema);
module.exports = Room;