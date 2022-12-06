import React from 'react'
import { socket } from '../global/instance'
import { ListGroup } from 'react-bootstrap'
export default function User (props) {
  const { start } = props
  const { user } = props
  const eventHandler = {
    invite: () => {
      if (document.getElementById('remote-video').srcObject) { return }
      // if (!document.getElementById('local-video').srcObject) {
      //   start()
      // }
      socket.emit('invite', user.id)
    }
  }

  if (!user.isBusy) {
    return (
      <ListGroup.Item
        className='text-center border border-secondary mb-1'
        variant='success' action onClick={eventHandler.invite}
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
