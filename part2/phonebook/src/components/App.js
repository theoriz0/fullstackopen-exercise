import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from './Filter';
import PersonForm from './PersonForm';
import personService from '../services/persons';
import Notification from '../components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage ] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(data => {
        console.log('promise fulfilled', data)
        setPersons(data)
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

  const hideNotification = () => {
    setNotificationMessage(null);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }
    if (persons.find((i) => i.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.addPerson(newPerson)
        .then(data => setPersons(persons.concat(data)));
      setNotificationMessage(`Added ${newName}`);
      setTimeout(hideNotification,2000);
      setNewName("");
      setNewNumber("");
      setFilterText("");
    }
  };

  const deletePerson = (person) => {
    const personToDelete = person.id
    console.log('delete person ', personToDelete)
    if (window.confirm(`delete ${person.name}?`)) {
      personService.deletePerson(personToDelete).then(
        setPersons(persons.filter(person => person.id !== personToDelete))
      )
    }
  }

  const personsToShow = persons.filter(personFilter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <Persons persons={personsToShow} handlePersonDelete={deletePerson} />
    </div>
  );
};

export default App;