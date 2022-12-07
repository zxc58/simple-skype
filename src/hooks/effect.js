import { useEffect } from 'react'
import {
  disableLocalVideo, disableRemoteVideo, initPc, socket, onHide,
  onDisplay, onInvite, enableMyVideo, createSignal, onToggleBusy
} from '../global/instance'
import { createInvitation } from '../global/helpers'
export const modalSideEffect = (setInvitation) => useEffect(() => {
  onInvite({ setInvitation })
}, [])

export const roomSideEffect = ({ room, invitation, setRoom, setInvitation }) => useEffect(() => {
  if (room) {
    const { action } = room
    switch (action) {
      case 'create':
        socket.emit('joinRoom', room, async (room) => { await enableMyVideo() })
        break
      case 'create+invite':
        socket.emit('joinRoom', room, async (room) => {
          await enableMyVideo()
          const invitation = createInvitation({ room })
          socket.emit('invite', invitation)
        })
        break
      case 'accept invite':
        socket.emit('joinRoom', room, async (result) => {
          if (!result) { setRoom(false); setInvitation(null) } else { await enableMyVideo(); await createSignal('Offer') }
        })
        break
    }
  } else {
    if (room === false) { window.alert('Room is fullyBooked') } else { initPc(); disableRemoteVideo(); disableLocalVideo() }
  }
}, [room])

export const usersSideEffect = (setUsers) => useEffect(() => {
  onDisplay({ setUsers })
  onHide({ setUsers })
  onToggleBusy({ setUsers })
  socket.emit('getUsers', (response) => {
    setUsers(response.filter(e => e.id !== socket.id && e.name))
  })
}, [])
