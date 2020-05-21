import React from 'react'

const Notification = ({message, type}) => {
  const style = {
    padding: 10,
    background: 'lightgrey',
    border: '2px solid transparent',
    borderRadius: '5px'
  }
  console.log('notification type', type)
  if (type === 'alert') {
    style.color = 'red';
    style.borderColor = 'red';
  } else if (type === 'success') {
    style.color = 'green';
    style.borderColor = 'green';
  }
  
  if (message === null) {
    return null
  }
  return <p style={style}>{message}</p>
}

export default Notification