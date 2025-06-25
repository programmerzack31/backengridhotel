const Room = require('../models/Room');


exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        console.log('server to fetch rooms', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.getRoomById = async (req, res) => {
  const id = req.params.id; // or use destructuring: const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ msg: 'Room not found' });
    res.json( room );
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};



exports.insertManyrooms = async (req, res) => {
  try {
    // Expecting req.body to be an array of room objects
    const roomsData = req.body;

    if (!Array.isArray(roomsData)) {
      return res.status(400).json({ message: "Input must be an array of room objects." });
    }

    const manyrooms = await Room.insertMany(roomsData);

    res.status(201).json({ message: "Rooms inserted successfully", data: manyrooms });
  } catch (err) {
    res.status(500).json({ message: "Error inserting rooms", error: err.message });
  }
};

