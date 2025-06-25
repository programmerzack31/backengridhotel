const express = require('express');
const router = express.Router();
const { getProfile ,login,register } = require('../controllers/authcontroller');
const  protect  = require('../middleware/auth');

router.post('/register' , register);
router.post('/login' , login);
router.get('/me' , protect , getProfile);

module.exports = router;