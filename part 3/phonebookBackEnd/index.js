const {loadEnvFile} = require('node:process');
loadEnvFile();

const express = require('express');
const morgan = require('morgan');

const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(morgan((tokens, req, res) => {
  const response = ':method :url :status :res[content-length] - :response-time ms';
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ');
}));
app.use(express.static("dist"));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  })
  .catch(error => {
    console.log('Get error while fetching data from database: ', error.message);
  })
});
// app.get('/api/info', (request, response) => {
//   Person.find({}).then(result => {
//     response.send(`
//       <p>Phonebook has info for ${result.length} people</p>
//       <p>${new Date()}</p>
//     `);
//   })
//   .catch(error => {
//     console.log('Get error while fetching data from database: ', error.message);
//   });
// });
app.get('/api/persons/:id', (request, response) => {
  const personsId = request.params.id;
  
  Person.findOne({ id: personsId }).then(result => {
    if (result) {
      response.json(result);
    }
    else {
      response.status(404).end();
    }
  })
  .catch(error => {
    console.log('Can\'t fetching data, get some error: ', error.message);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch()
});

app.post('/api/persons', async (request, response) => {
  const body = request.body;
  const nameIsExists = await Person.findOne({name: body.name}).exec() === null ? false : true;
 
  if (nameIsExists) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  try {
    const doc = await Person.findOne({}).sort({ id: -1 }).exec();
    const maxId = doc.id !== undefined ? doc.id : 0;

    const person = new Person({
      id: maxId + 1,
      name: body.name,
      number: body.number,
    });

    const saveResult = await person.save();
    console.log('Person was saved!');
    response.status(200).end();
  }
  catch(err) {
    console.log('Get some error!: ', err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});