/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import User from './User'
import socket from '../functions/socket'
import { ListGroup } from 'react-bootstrap'
export default function List (props) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    socket.on('display', (user) => {
      setUsers(prevUsers => {
        const i = prevUsers.find(e => e.id === user.id)
        if (!i) {
          return [...prevUsers, user]
        } return [...prevUsers]
      })
    })
    socket.emit('getUsers', (response) => {
      // console.log('socket id: ' + socket.id)
      // console.log(response)
      setUsers(response.filter(e => e.id !== socket.id && e.name))
    })
    socket.on('hide', (userId) => {
      setUsers(prevUsers => {
        const newUsers = prevUsers.filter(e => e.id !== userId)
        return newUsers
      })
    })
  }, [])
  const usersComponents = users?.length ? users.map(e => <User key={e.id} id={e.id} name={e.name}/>) : null
  return (
    <ListGroup >
      {usersComponents}
    </ListGroup>
  )
}
