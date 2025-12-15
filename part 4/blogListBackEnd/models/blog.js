const config = require('../utils/config');
const { info, err } = require('../utils/logger');

const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { family: 4, dbName: process.env.NODE_ENV === 'test' ? 'testingDB' : 'test' })
  .then(() => info('Connected to MongoDB'))
  .catch(error => {
    err(`Error connecting to MongoDB: `, error.message);
  });

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 7,
    required: true,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    minLength: 10,
    required: true,
  },
  likes: Number,
}, { collection: 'blogs' });
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Blog', blogSchema);