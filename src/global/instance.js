import { io } from 'socket.io-client'
const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
  }]
}
// eslint-disable-next-line no-undef
export const socket = io(process.env.REACT_APP_BACKEND)

// eslint-disable-next-line no-undef
export const pc = new RTCPeerConnection(configuration)
