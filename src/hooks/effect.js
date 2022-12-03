import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { socket } from '../global/instance'
import { onHide, onDisplay, onInvite, enableMyVideo } from '../global/events'

export const modalSideEffect = (setModal) => useEffect(() => {
  console.log('modal side effect')
  onInvite({ setModal })
}, [])

export const roomSideEffect = (isInRoom) => useEffect(() => {
  console.log('room side effect')
  if (isInRoom && isInRoom !== 'inviting') {
    enableMyVideo()
    const roomId = uuidv4()
    socket.emit('joinRoom', roomId)
  }
  if (isInRoom === false) { // 斷開連線時
    const localVideo = document.getElementById('local-video')
    localVideo.srcObject.getTracks().forEach(track => track.stop())
    localVideo.srcObject = null
    socket.emit('leaveRoom')
  }
}, [isInRoom])

export const usersSideEffect = (setUsers) => useEffect(() => {
  onDisplay({ setUsers })
  onHide({ setUsers })
  socket.emit('getUsers', (response) => {
    setUsers(response.filter(e => e.id !== socket.id && e.name && !e.isBusy))
  })
}, [])
