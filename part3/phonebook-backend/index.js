require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const Person = require('./model/person')

const app = express();
morgan.token('body', (req) => {
  console.log(req.body);
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))

app.get("/api/persons", (req, res) => {
  Person.find({}).then(result => {
    res.send(result)
  })
});

app.get("/info", (req, res) => {
  Person.find({}).then(result => {
    res.send(
      `<p>Phonebook has info for ${result.length} people</p><p>${Date()}</p>`
    )
  })
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(result => {
    if (result) {
      res.send(result)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    res.status(400).send('malformmated id')
  })
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error: error.message
      })
    })
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (Person.find({'name': body.name}).length) {
    return res.status(400).json({
      error: "name must be unique",
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app start listening on", PORT);
});