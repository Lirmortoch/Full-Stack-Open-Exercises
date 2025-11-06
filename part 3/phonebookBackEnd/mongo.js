const mongoose = require('mongoose');
const {loadEnvFile, argv} = require('node:process');
loadEnvFile();

if (process.argv.length < 3) {
  console.log('Provide user\'s password');
  process.exit(1);
}

const password = process.env.PASSWORD_MONGO_DB;

const url = `mongodb+srv://dima2111323_db_user:${password}@cluster0.lzqwpxp.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
});
const Person = mongoose.model('Person', personSchema);

if (argv[2] === password) {
  
}
else {
  console.log('Wrong password!');
  process.exit(1);
}