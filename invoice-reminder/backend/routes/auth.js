const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google OAuth login route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/invoices',
    failureRedirect: '/',
  })
);

// Get user info
router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('Not logged in');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);
    res.send('Logged out');
  });
});

module.exports = router;
