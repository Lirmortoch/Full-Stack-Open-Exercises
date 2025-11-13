const {loadEnvFile} = require('node:process');
loadEnvFile();

const express = require('express');
const morgan = require('morgan');

const Person = require('./models/person');

const app = express();

app.use(express.static("dist"));
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

app.use(errorHandler);

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
  .catch(error => next(error));
});
app.get('/api/info', (request, response, next) => {
  Person.find({}).then(result => {
    response.send(`
      <p>Phonebook has info for ${result.length} people</p>
      <p>${new Date()}</p>
    `);
  })
  .catch(error => {
    console.log('Get error while fetching data from database: ', error.message);
  });
});
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    }
    else {
      response.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', async (request, response, next) => {
  const body = request.body;
  const pers = await Person.findOne({name: body.name}).exec();
 
  if (pers !== null) {
    Person.findById(pers.id)
      .then(person => {
        person.number = body.number;

        return person.save().then(result => {
          response.json(result);
        })
      })
      .catch(error => next(error));

    response.status(204).end();
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
  catch(error) {
    next(error)
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});