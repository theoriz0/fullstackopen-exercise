import React from 'react'

const Person = ({person: {name, number}}) => <p>{name} {number}</p>

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default Persons