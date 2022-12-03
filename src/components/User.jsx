/* eslint-disable no-unused-vars */
import { StatusContext } from '../routes/Main'
import React, { useContext } from 'react'
import socket from '../functions/socket'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
export default function User (props) {
  const { user } = props
  // const { isInRoom } = useContext(StatusContext)
  const invite = async () => {
    socket.emit('invite', user.id)
  }
  const { isInRoom } = useContext(StatusContext)
  if (isInRoom) {
    return (
      <ListGroup.Item
        className='text-center border border-secondary mb-1'
        variant='success' action onClick={invite}
      >
        {user.name}
      </ListGroup.Item>
    )
  }
  return (
    <ListGroup.Item
      className='text-center border border-secondary mb-1'
      variant='danger'
    >
      {user.name}
    </ListGroup.Item>
  )
}
