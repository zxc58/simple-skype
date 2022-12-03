import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import socket, { onDisplay, onHide } from './socket'
import { createLocalStream } from './helpers'
// eslint-disable-next-line no-unused-vars
import pc from './peerConnection'

export const modalSideEffect = (setModal) => useEffect(() => {
  console.log('modal side effect')
  socket.on('invite', ({ name, roomId }) => {
    setModal({ name, roomId })
  })
}, [])

export const roomSideEffect = (isInRoom) => useEffect(() => {
  console.log('room side effect')
  if (isInRoom && isInRoom !== 'inviting') {
    (async () => {
      const localStream = await createLocalStream()
      document.getElementById('local-video').srcObject = localStream
      localStream.getTracks().forEach(track => {
        console.log('pc add track')
        pc.addTrack(track)
      })
    })()
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
