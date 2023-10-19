const express = require('express');
const router = express.Router();
const homeCntrl = require('../controllers/home_contrler')

router.get('/', homeCntrl.home)
router.use('/users', require('./users'))
router.use('/posts', require('./post'))
module.exports = router;