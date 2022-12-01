/* eslint-disable no-unused-vars */
import { StatusContext } from '../routes/Main'
import React from 'react'
import socket from '../functions/socket'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
export default function User (props) {
  const { user } = props
  const invite = async () => {

    // socket.emit('invite', user.id)
  }
  return (
    <>
      <ListGroup.Item
        className='text-center border border-secondary'
        action variant="primary"
        onClick={invite}
      >
        {user.name}
      </ListGroup.Item>
      <br/>
    </>
  )
}
