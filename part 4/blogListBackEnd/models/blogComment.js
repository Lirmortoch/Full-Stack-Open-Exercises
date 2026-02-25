const mongoose = require('mongoose');

const blogCommentSchema = mongoose.Schema({
  comment: {
    type: String,
    minLength: 2,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
}, { collection: 'blogsComments' });
blogCommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('BlogComments', blogCommentSchema);