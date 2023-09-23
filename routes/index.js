const express = require('express');
const router = express.Router();
const homeCntrl = require('../controllers/home_contrler')

router.get('/', homeCntrl.home)

module.exports = router;