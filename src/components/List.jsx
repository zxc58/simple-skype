import { StatusContext } from '../routes/Main'
import React, { useState, useContext } from 'react'
import User from './User'
import { ListGroup } from 'react-bootstrap'
import { usersSideEffect } from '../hooks/effect'
export default function List (props) {
  const [users, setUsers] = useState([])
  const { name } = useContext(StatusContext)
  usersSideEffect(setUsers)
  const usersComponents = users.map(e => <User key={e.id} user={e}/>)
  return (
    <>
      <h5 className='text-center text-white bg-primary py-1'>{name}</h5>
      <ListGroup className='overflow-auto'>
        {usersComponents}
      </ListGroup>
    </>
  )
}
