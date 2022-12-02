/* eslint-disable no-unused-vars */

import socket, { onPeerconnectSignaling } from './socket'
// eslint-disable-next-line prefer-const
const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
  }]
}

// eslint-disable-next-line no-undef
const pc = new RTCPeerConnection(configuration)
pc.onicecandidate = ({ candidate }) => {
  if (!candidate) { return }
  console.log('onIceCandidate => ', candidate)
  socket.emit('peerconnectSignaling', { candidate })
}
pc.onaddstream = (event) => {
  const remoteVideo = document.getElementById('remote-video')
  if (!remoteVideo.srcObject && event.stream) {
    remoteVideo.srcObject = event.stream
    console.log('接收流並顯示於遠端視訊！', event)
  }
}
onPeerconnectSignaling({ pc })

export default pc
