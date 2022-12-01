import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import socket from './socket'

export const useEffectCreateRoom = (isInRoom) => {
  useEffect(() => {
    if (isInRoom) {
      (async () => {
        const constraints = { audio: true, video: true }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        document.querySelector('#my-video').srcObject = stream
        const roomId = uuidv4()
        socket.emit('createRoom', roomId)
      })()
    }
  }, [isInRoom])
}
export const useEffectOnInvite = () => {

}
export const useEffectUsers = (setUsers) => {
  useEffect(() => {
    socket.on('display', (user) => {
      setUsers(prevUsers => {
        const i = prevUsers.find(e => e.id === user.id)
        if (!i) {
          return [...prevUsers, user]
        } return [...prevUsers]
      })
    })
    socket.emit('getUsers', (response) => {
      setUsers(response.filter(e => e.id !== socket.id && e.name))
    })
    socket.on('hide', (userId) => {
      setUsers(prevUsers => {
        const newUsers = prevUsers.filter(e => e.id !== userId)
        return newUsers
      })
    })
  }, [])
}
