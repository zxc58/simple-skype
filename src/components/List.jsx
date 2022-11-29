/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import User from './User'
import socket from '../functions/socket'
export default function List (props) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    socket.emit('getUsers', (response) => {
      setUsers(response)
    })
  }, [])
  const usersComponents = users?.length ? users.map(e => <User key={e.id} id={e.id} name={e.name}/>) : null
  return (
    <ul>
      {usersComponents}
    </ul>
  )
}
