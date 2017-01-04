// input to mongoose that describes the app

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// NOTE: Mongoose does not deferentiate between upper and lower case so the below are the same
// R.SCHEFFERS@GMAIL.COM
// r.scheffers@gmail.com
// to fix this add lowercase: true

// On Save Hook, encrypt password

// Before saving a model, run this function
userSchema.pre('save', function (next) {
  const user = this;      // access the user model, an instance of user

  // generate a salt then run callback function
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our passowrd using the salt
    // this takes time so run function when done.
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
