const express = require('express');
const router = express.Router();

const userCntrl = require('../controllers/user_contrler');

router.get('/profile', userCntrl.profile)

module.exports = router;