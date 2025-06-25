const router = require('express').Router();
const {getAllRooms , insertManyrooms, getRoomById} = require('../controllers/roomscontroller');

router.get('/' , getAllRooms);
router.post('/' , insertManyrooms);
router.get('/:id' , getRoomById);

module.exports = router;