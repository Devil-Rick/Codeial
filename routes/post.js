const express = require('express');
const router = express.Router();


// authenticate if the user is only posting
const passport = require('passport');

const postCntrl = require('../controllers/post_controller');

router.post('/create-post', passport.checkAuthentication, postCntrl.create);

module.exports = router;