import React from 'react'
import socket from '../functions/socket'
export default function User (props) {
  const { name, id } = props
  const invite = () => {
    socket.emit('invite', id)
  }
  return (
        <li>
            <span className='user-name' onClick={invite}>{name}</span>
        </li>
  )
}
