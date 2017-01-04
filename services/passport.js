const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require ('../config');

// Create local strategy
// This is used when a returning user provides their email and password to localLogin
// This will be checked against the DB and a token is provided if all goes well.
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Look up the user based on their provided email address
  // On error, return done with an error
  // if no user is found return false
  User.findOne( { email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {return done(null, false); }

    // compare passwords - is 'password' equal to user.password
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy,
// This is used when a user first signs up
// It will return a token indicating that the user now is logged in
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our DB
  // YES: call 'done' with that
  // NO: call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
