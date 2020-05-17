import React from 'react'

const Person = ({person, handleDeleteClick}) => {
  return (
    <div>
      <p>{person.name} {person.number} <button person={person} onClick={handleDeleteClick}>delete</button></p>
    </div>
  )
}

const Persons = ({persons, handlePersonDelete}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} person={person} handleDeleteClick={event => handlePersonDelete(person)}/>)}
    </div>
  )
}

export default Persons