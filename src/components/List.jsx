import React, { useEffect, useState, useContext } from 'react'
import { ListGroup, Badge } from 'react-bootstrap'
import { StatusContext } from '../routes/Main'
import User from './User'
import { socket } from '../global/instance'
//
export default function List (props) {
  const [users, setUsers] = useState([])
  const { name } = useContext(StatusContext)
  // useEffect
  useEffect(() => {
    socket.on('display', (user) => {
      setUsers(prevUsers => [...prevUsers, { ...user, isBusy: false }])
    })
    socket.on('hide', (userId) => {
      setUsers(prevUsers => {
        const newUsers = prevUsers.filter(e => e.id !== userId)
        return newUsers
      })
    })
    socket.on('toggleBusy', (userId) => {
      setUsers(prevUsers => {
        const user = prevUsers.find(e => e.id === userId)
        user.isBusy = !user.isBusy
        return [...prevUsers]
      })
    })
    socket.emit('getUsers', (response) => {
      setUsers(response.filter(e => e.id !== socket.id && e.name))
    })
  }, [])
  //
  return (
    <>
      <h4 className='my-0 mx-0 position-fixed d-none' id='badge-warn'><Badge bg="danger" >聊天室已滿</Badge></h4>
      <h5 className='text-center text-white bg-primary py-1'>{name}</h5>
      <ListGroup className='overflow-auto h-75'>
        {users.map(e => <User key={e.id} user={e}/>)}
      </ListGroup>
    </>
  )
}
