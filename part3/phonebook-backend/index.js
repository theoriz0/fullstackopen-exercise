const express = require("express");
const morgan = require("morgan");

const app = express();
morgan.token('body', (req) => {
  console.log(req.body);
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))
let persons = [
  {
    name: "Arto Helloa",
    number: "040-123895",
    id: 1,
  },
  {
    name: "Ada Locelace",
    number: "39-44-123045",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-41-1234551",
    id: 3,
  },
  {
    name: "Mary Popperhead",
    number: "39-23-12471",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000),
  };

  persons = persons.concat(person)
  res.json(person)
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("app start listening on", PORT);
});