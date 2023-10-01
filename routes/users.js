const express = require('express');
const router = express.Router();

const userCntrl = require('../controllers/user_contrler');

router.get('/profile', userCntrl.profile);
router.get('/sign-up', userCntrl.signup);
router.get('/sign-in', userCntrl.signin);
router.post('/new-user', userCntrl.newUser);
router.post('/session', userCntrl.session);
router.post('/logout', userCntrl.logout);
module.exports = router;