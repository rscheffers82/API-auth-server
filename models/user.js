// input to mongoose that describes the app

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
