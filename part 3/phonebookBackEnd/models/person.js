const mongoose = require('mongoose');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB database');
  })
  .catch(error => {
    console.log(`Error to connecting: ${error.message}`);
  });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
}, {collection: 'persons'});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
});

module.exports = mongoose.model('Person', personSchema);