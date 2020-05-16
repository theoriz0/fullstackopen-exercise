import React, { useState } from "react";
import Numbers from "./Numbers";
import Filter from './Filter';
import PersonForm from './PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

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
      <Numbers persons={personsToShow} />
    </div>
  );
};

export default App;