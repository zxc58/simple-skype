import { createRoom } from '../global/helpers'
import { StatusContext } from '../routes/Main'
import React, { useContext } from 'react'
import { socket } from '../global/instance'
import { Button } from 'react-bootstrap'
export default function User (props) {
  const { user } = props
  const { room, setRoom } = useContext(StatusContext)
  const eventHandler = {
    invite: () => {
      if (document.getElementById('remote-video').srcObject) { return }
      if (!room) {
        const roomConfig = createRoom()
        roomConfig.createRoomCallback = (room) => {
          const data = { room, invitingId: user.id }
          delete data.room.createRoomCallback
          socket.emit('invite', data)
        }
        return setRoom(roomConfig)
      }
      socket.emit('invite', { room, invitingId: user.id })
    }
  }

  return (
    <Button className='my-1'
      variant={!user.isBusy ? 'success' : 'danger'}
      disabled={user.isBusy}
      onClick={!user.isBusy ? eventHandler.invite : null}
    >
      {user.name}
    </Button>
  )
}
