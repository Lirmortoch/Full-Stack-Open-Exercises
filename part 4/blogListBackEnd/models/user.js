const mongoose = require('mongoose');

const config = require('../utils/config');
const { info, err } = require('../utils/logger');

mongoose.connect(config.MONGODB_URI, { family: 4, dbName: process.env.NODE_ENV === 'test' ? 'testingDB' : 'test' })
  .then(() => info('Connected to MongoDB'))
  .catch(error => {
    err(`Error connecting to MongoDB: `, error.message);
  });

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;