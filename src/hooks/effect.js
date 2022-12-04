import { useEffect } from 'react'
import { socket, onHide, onDisplay, onInvite, enableMyVideo, createSignal } from '../global/instance'

export const modalSideEffect = (setInvitation) => useEffect(() => {
  console.log('modal side effect')
  onInvite({ setInvitation })
}, [])

export const roomSideEffect = ({ roomId, invitation }) => useEffect(() => {
  console.log('room side effect')
  if (roomId) {
    (async () => {
      await enableMyVideo()
      console.log('join room,invitation :  ')
      console.log(invitation)
      socket.emit('joinRoom', roomId, !invitation
        ? undefined
        : async () => {
          console.log('accept invite')
          await createSignal(true)
        }
      )
    })()
  }
  if (!roomId) {
    const localVideo = document.getElementById('local-video')
    const remoteVideo = document.getElementById('remote-video')
    if (localVideo.srcObject) {
      socket.emit('leaveRoom')
      localVideo.srcObject.getTracks().forEach(track => track.stop())
      localVideo.srcObject = null
    }
    if (remoteVideo.srcObject) {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop())
      remoteVideo.srcObject = null
    }
  }
}, [roomId])

export const usersSideEffect = (setUsers) => useEffect(() => {
  onDisplay({ setUsers })
  onHide({ setUsers })
  socket.emit('getUsers', (response) => {
    setUsers(response.filter(e => e.id !== socket.id && e.name && !e.isBusy))
  })
}, [])
