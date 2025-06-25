const Booking = require('../models/Booking');

 exports.createBooking = async (req,res)=>{
    const {roomId,fromDate,toDate} = req.body;
    const booking = await Booking.create({
        roomId,
        userId:req.user.userId,
        fromDate,
        toDate
    });
    res.json(booking);
 };

 exports.getUserBookings = async (req,res)=>{
    const bookings = await Booking.find({userId:req.user.userId}).populate('roomId');
    res.json(bookings);
 };

 exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    await Booking.findByIdAndDelete(id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};
