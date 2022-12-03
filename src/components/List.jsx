/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import User from './User'
import socket from '../functions/socket'
import { ListGroup } from 'react-bootstrap'
import { usersSideEffect } from '../functions/useEffects'
export default function List (props) {
  const [users, setUsers] = useState([])
  usersSideEffect(setUsers)
  const usersComponents = users?.length ? users.map(e => <User key={e.id} user={e} />) : null
  return (
    <ListGroup>
      {usersComponents}
    </ListGroup>
  )
}
