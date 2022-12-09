/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import {
  disableLocalVideo, disableRemoteVideo, initPc, socket, onHide,
  onDisplay, onInvite, enableMyVideo, createSignal, onToggleBusy
} from '../global/instance'
import { createInvitation, createLocalStream } from '../global/helpers'
export const modalSideEffect = (setInvitation) => useEffect(() => {
  onInvite({ setInvitation })
}, [])

export const roomSideEffect = ({ room, invitation, videos, setRoom, setInvitation, setVideos }) => useEffect(() => {
  if (room) {
    const { action } = room
    switch (action) {
      case 'create':
        socket.emit('joinRoom', room, async (room) => {
          const localStream = await createLocalStream()
          setVideos([{ id: socket.id, type: 'local-video', stream: localStream }])
        })
        break
      case 'create+invite':
        socket.emit('joinRoom', room, async (room) => {
          const localStream = await createLocalStream()
          setVideos([{ id: socket.id, type: 'local video', stream: localStream }])
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
