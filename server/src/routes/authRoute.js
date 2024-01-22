const { response } = require("express");
const authController = require("../controllers/googleController");
const passport = require('passport')
require('dotenv').config();
const router = require("express").Router();


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, profile) => {
    req.user = profile;
    next();
  })(req, res, next)
}, (req, res) => {
    res.redirect(`http://localhost:3001/login-success/${req.user?.id}`)
})

router.post('/login-success',authController.loginSuccess)

module.exports = router;