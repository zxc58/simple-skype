import React, { useState, useContext } from 'react'
import { ListGroup, Badge } from 'react-bootstrap'
import { StatusContext } from '../routes/Main'
import User from './User'
import effectHook from '../hooks/effect'
//
export default function List (props) {
  const [users, setUsers] = useState([])
  const { name } = useContext(StatusContext)
  effectHook.users(setUsers)
  const usersComponents = users.map(e => <User key={e.id} user={e}/>)
  return (
    <>
      <h4 className='my-0 mx-0 position-fixed d-none' id='badge-warn'><Badge bg="danger" >聊天室已滿</Badge></h4>
      <h5 className='text-center text-white bg-primary py-1'>{name}</h5>
      <ListGroup className='overflow-auto h-75'>
        {usersComponents}
      </ListGroup>
    </>
  )
}
