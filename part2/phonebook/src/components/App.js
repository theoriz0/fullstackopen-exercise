import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from './Filter';
import PersonForm from './PersonForm';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response)
        setPersons(response.data)
      })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const personFilter = (person) => {
    let b = person.name.toLowerCase().includes(filterText.toLowerCase());
    console.log(b);
    return b;
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((i) => i.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
      setFilterText("");
    }
  };

  const personsToShow = persons.filter(personFilter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterText} onchange={handleFilterTextChange} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onnamechange={handleNewNameChange}
        onnumberchange={handleNewNumberChange}
        onsubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;