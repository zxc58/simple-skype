import { useEffect } from 'react'
import { disableRemoteVideo, initPc, socket, onHide, onDisplay, onInvite, enableMyVideo, createSignal, onToggleBusy } from '../global/instance'

export const modalSideEffect = (setInvitation) => useEffect(() => {
  onInvite({ setInvitation })
}, [])

export const roomSideEffect = ({ roomId, invitation }) => useEffect(() => {
  if (roomId) {
    (async () => {
      await enableMyVideo()
      socket.emit('joinRoom', roomId, invitation ? async () => await createSignal('Offer') : undefined)
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
}, [roomId])

export const usersSideEffect = (setUsers) => useEffect(() => {
  onDisplay({ setUsers })
  onHide({ setUsers })
  onToggleBusy({ setUsers })
  socket.emit('getUsers', (response) => {
    setUsers(response.filter(e => e.id !== socket.id && e.name))
  })
}, [])
