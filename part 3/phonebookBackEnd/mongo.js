const mongoose = require('mongoose');
const {loadEnvFile, argv} = require('node:process');
loadEnvFile();

if (argv.length !== 5 && argv.length !== 3) {
  console.log('Provide user\'s password');
  process.exit(1);
}

const password = process.env.PASSWORD_MONGO_DB;

const url = `mongodb+srv://dima2111323_db_user:${password}@cluster0.lzqwpxp.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
}, {collection: 'persons'});
const Person = mongoose.model('Person', personSchema);

async function addPerson() {
  if (argv[2] === password) {
    if (argv.length === 5) {
      try {
        const name = argv[3];
        const number = argv[4];

        const doc = await Person.findOne({}).sort({ id: -1 }).exec();
        const maxId = doc.id !== undefined ? doc.id : 0;

        const person = new Person({
          id: maxId + 1,
          name: name,
          number: number,
        });
      
        const saveResult = await person.save();
        console.log('Person was saved!');
      }
      catch(err) {
        console.log('Get some error!: ', err);
      }
      finally {
        mongoose.connection.close();
      }
    }
    else if (argv.length === 3) {
      try {
        console.log('phonebook');
        const persons = await Person.find({});

        persons.forEach(item => {
          console.log(`${item.name} ${item.number}`);
        });
      }
      catch (err) {
        console.log(`Get some error! ${err}`);
      }
      finally {
        mongoose.connection.close();
      }
    }
    else {
      console.log('missing some argument!');
      process.exit(1);
    }
  }
  else {
    console.log('Wrong password!');
    process.exit(1);
  }
}

addPerson();