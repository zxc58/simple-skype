/* eslint-disable no-unused-vars */
import socket from './socket'
export const registerUser = (setName, navigate) => async (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value
  socket.emit('register', name)
  setName(name)
  navigate('/')
}
