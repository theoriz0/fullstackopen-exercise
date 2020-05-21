import React from 'react'

const Notification = ({message}) => {
  const style = {
    padding: 10,
    background: 'lightgrey',
    color: 'green',
    border: '2px solid green',
    borderRadius: '5px'
  }
  if (message === null) {
    return null
  }
  return <p style={style}>{message}</p>
}

export default Notification