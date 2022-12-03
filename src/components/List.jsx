import React, { useState } from 'react'
import User from './User'
import { ListGroup } from 'react-bootstrap'
import { usersSideEffect } from '../hooks/effect'
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
