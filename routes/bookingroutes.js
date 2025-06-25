const router = require('express').Router();
const { createBooking, getUserBookings ,cancelBooking} = require('../controllers/bookingController');
const protect = require('../middleware/auth');

router.post('/create', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.delete('/cancel/:id', protect, cancelBooking);

module.exports = router;
