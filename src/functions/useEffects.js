/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import socket, { onDisplay, onHide, createSignal, onInvite } from './socket'
import { createLocalStream } from './helpers'
import pc from './peerConnection'

let [localStream, remoteStream] = [null, null]

export const roomSideEffect = (isInRoom) => {
  useEffect(() => {
    if (isInRoom) {
      (async () => {
        localStream = await createLocalStream()
        document.getElementById('local-video').srcObject = localStream
        // console.log(localStream)
        localStream.getTracks().forEach(track => pc.addTrack(track))
      })()
      const roomId = uuidv4()
      socket.emit('joinRoom', roomId)
    }
    if (isInRoom === null) {
      onInvite(pc)
    }
    if (isInRoom === false) {
      localStream.getTracks().forEach(track => track.stop())
      document.getElementById('local-video').srcObject = null
      socket.emit('leaveRoom')
    }
  }, [isInRoom])
}

export const usersSideEffect = (setUsers) => {
  useEffect(() => {
    onDisplay({ setUsers })
    onHide({ setUsers })
    socket.emit('getUsers', (response) => {
      setUsers(response.filter(e => e.id !== socket.id && e.name && !e.isBusy))
    })
  }, [])
}
