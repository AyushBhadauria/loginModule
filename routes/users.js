const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});
// //gooogle
//    // send to google to do the authentication
//    router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

//    // the callback after google has authenticated the user
//    router.get('google/callback',
//        passport.authenticate('google', {
//            successRedirect : '/profile',
//            failureRedirect : '/'
//        }));
       router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

       router.get('/facebook/callback', 
         passport.authenticate('facebook', { successRedirect: '/profile',
                                             failureRedirect: '/' }));
     
       router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
     
       router.get('/google/callback', 
         passport.authenticate('google', { successRedirect: '/users/profile',
                                             failureRedirect: '/' }));
     
     
// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;