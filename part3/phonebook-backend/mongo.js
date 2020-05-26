const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://theoriz:${password}@cluster0-yqhse.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const logPersons = () => {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}

const addPerson = p => {
  console.log(p)
  const person = new Person(p)
  person.save().then(result => {
    console.log(`added ${p.name} ${p.number}`)
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument')
  process.exit(1)
} else if (process.argv.length < 5) {
  logPersons()
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  addPerson({name, number})
}

// const person = new Person({
//   name: 'Askot',
//   number: '0991-10010'
// })

// 