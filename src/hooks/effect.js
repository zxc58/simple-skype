import { useEffect } from 'react'
import { disableRemoteVideo, initPc, socket, onHide, onDisplay, onInvite, enableMyVideo, createSignal, onToggleBusy } from '../global/instance'

export const modalSideEffect = (setInvitation) => useEffect(() => {
  onInvite({ setInvitation })
}, [])

export const roomSideEffect = ({ room, invitation }) => useEffect(() => {
  if (room) {
    const { createRoomCallback } = room;
    (async () => {
      await enableMyVideo()
      socket.emit('joinRoom', room, invitation
        ? async () => await createSignal('Offer')
        : (room) => { if (createRoomCallback) { createRoomCallback(room) } }
      )
    })()
  } else {
    initPc()
    disableRemoteVideo()
    const localVideo = document.getElementById('local-video')
    if (localVideo.srcObject) {
      socket.emit('leaveRoom')
      localVideo.srcObject.getTracks().forEach(track => track.stop())
      localVideo.srcObject = null
    }
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
