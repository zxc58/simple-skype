/* eslint-disable no-unused-vars */
import { createRoom, createInvitation, fullBookedBadge } from '../global/helpers'
import { StatusContext } from '../routes/Main'
import React, { useEffect, useContext } from 'react'
import { socket } from '../global/instance'
import { Button } from 'react-bootstrap'

export default function User (props) {
  const { user } = props
  const { name, room, setRoom } = useContext(StatusContext)
  // useEffect

  // EventHandler
  const clickEventHandler = {
    invite: (e) => {
      // if (document.getElementById('remote-video').srcObject) {
      //   fullBookedBadge(e)
      //   return
      // }
      if (!room) { // create room and invite
        const otherAttributes = { invitingId: user.id, invitingName: user.name, inviterName: name, inviterId: socket.id }
        const roomConfig = createRoom('create+invite', otherAttributes)
        return setRoom(roomConfig)
      }
      const invitation = createInvitation({ room, socket, name, user })
      socket.emit('invite', invitation)
    }
  }

  return (
    <Button className='my-1 rounded-pill'
      variant={!user.isBusy ? 'success' : 'danger'}
      disabled={user.isBusy}
      onClick={!user.isBusy ? clickEventHandler.invite : null}
    >
      {user.name}
    </Button>
  )
}
