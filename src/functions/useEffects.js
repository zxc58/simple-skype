import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import socket, { onDisplay, onHide } from './socket'
import { createLocalStream } from './helpers'
import pc from './peerConnection'

let [localStream] = [null, null]

export const modalSideEffect = (setModal) => useEffect(() => {
  console.log('modal side effect')
  socket.on('invite', ({ name, roomId }) => {
    setModal({ name, roomId })
  })
}, [])

export const roomSideEffect = (isInRoom) => useEffect(() => {
  console.log('room side effect')
  if (isInRoom) {
    (async () => {
      localStream = await createLocalStream()
      document.getElementById('local-video').srcObject = localStream
      localStream.getTracks().forEach(track => {
        console.log('pc add track')
        pc.addTrack(track)
      })
    })()
    if (isInRoom !== 'inviting') {
      const roomId = uuidv4()
      socket.emit('joinRoom', roomId)
    }
  }
  if (isInRoom === false) { // 斷開連線時
    localStream.getTracks().forEach(track => track.stop())
    document.getElementById('local-video').srcObject = null
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
