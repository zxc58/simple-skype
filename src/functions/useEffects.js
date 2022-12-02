/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import socket, { onDisplay, onHide, createSignal } from './socket'
import { createLocalStream } from './helpers'
import pc from './peerConnection'

let [localStream, remoteStream] = [null, null]

export const createOrLeaveRoom = (isInRoom) => {
  useEffect(() => {
    if (isInRoom) {
      (async () => {
        localStream = await createLocalStream()
        // console.log(localStream)
        document.getElementById('local-video').srcObject = localStream
        const roomId = uuidv4()
        socket.emit('createRoom', roomId)
        pc.addStream(localStream)
        createSignal(pc)(true)
        // console.log(createSignal(true))
      })()
    } else if (isInRoom === false) {
      localStream.getTracks().forEach(track => track.stop())
      document.getElementById('local-video').srcObject = null
      socket.emit('leaveRoom')
    }
  }, [isInRoom])
}

export const useEffectOnInvite = () => {

}

export const useEffectUsers = (setUsers) => {
  useEffect(() => {
    onDisplay({ setUsers })
    onHide({ setUsers })
    socket.emit('getUsers', (response) => {
      setUsers(response.filter(e => e.id !== socket.id && e.name))
    })
  }, [])
}
