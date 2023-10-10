const express = require('express');
const router = express.Router();
const passport = require('passport');

const userCntrl = require('../controllers/user_contrler');

router.get('/profile', passport.checkAuthentication, userCntrl.profile);
router.get('/sign-up', userCntrl.signup);
router.get('/sign-in', userCntrl.signin);

router.post('/new-user', userCntrl.newUser);

// use passport as middleware for authenticating
router.post('/session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}),
    userCntrl.session
);

router.get('/sign-out', userCntrl.destroySession)
module.exports = router;