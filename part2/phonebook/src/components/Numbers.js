import React from 'react'

const Number = (props) => <p>{props.name}</p>

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person => <Number key={person.name} name={person.name} />)}
    </div>
  )
}

export default Numbers