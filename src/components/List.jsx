import React, { useState } from 'react'
import User from './User'
import { ListGroup } from 'react-bootstrap'
import { usersSideEffect } from '../hooks/effect'
export default function List (props) {
  const [users, setUsers] = useState([])
  usersSideEffect(setUsers)
  const usersComponents = users.map(e => <User key={e.id} user={e}/>)
  return (
    <>
      <h5 className='text-center text-white bg-primary py-1'>Users</h5>
      <ListGroup className='overflow-auto'>
        {usersComponents}
      </ListGroup>
    </>
  )
}
