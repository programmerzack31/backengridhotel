const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');

dotenv.config();



mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Room.deleteMany();
    await Room.insertMany(rooms);
    console.log("Rooms added!");
    process.exit();
  })
  .catch((err) => console.log(err));
