require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./model/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req) => {
  console.log(req.body)
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.send(result)
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<p>Phonebook has info for ${result.length} people</p><p>${Date()}</p>`
    )
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.send(result)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  // if (Person.find({ name: body.name })) {
  //   return res.status(400).json({
  //     error: 'name must be unique',
  //   });
  // } else {
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => {
      console.log(error._message)
      res.status(400).send({ error: error.message })
    })
}
// });
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('app start listening on', PORT)
})
