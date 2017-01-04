// load in all of our user data from our database
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub = subject
  // iat = issued at time
  // these two vars are given by the jwt library
  return jwt.encode( { sub: user.id, iat: timestamp }, config.secret );
}

exports.signUp = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Please provide email and password' });
  }

  // See if a user with a given email exists
  User.findOne( {email: email }, function (err, existingUser) {
    // search for email within the DB and pass the result to the function
    // existingUser will be a user object or null when not found
    if (err) { return next(err); }

    // if user with email exists, return an Error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    // if user with email does NOT exists, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save( function(err) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });



}
