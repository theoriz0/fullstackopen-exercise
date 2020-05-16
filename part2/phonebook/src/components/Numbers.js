import React from 'react'

const Number = ({person: {name, number}}) => <p>{name} {number}</p>

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person => <Number key={person.name} person={person} />)}
    </div>
  )
}

export default Numbers