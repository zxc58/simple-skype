/* eslint-disable no-unused-vars */
import { createLocalStream } from './helpers'
import socket, { onPeerconnectSignaling } from './socket'
// eslint-disable-next-line prefer-const
const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
  }]
}
console.log('pc js file')
// eslint-disable-next-line no-undef
const pc = new RTCPeerConnection(configuration)
pc.onicecandidate = ({ candidate }) => { // 當通過 RTCPeerConnection.setLocalDescription()方法更改本地描述之後icecandidate 事件
  if (!candidate) { return }
  console.log('Emit candidate: ' + candidate.toString())
  socket.emit('peerconnectSignaling', { candidate })
}

// The track event is sent to the ontrack event handler on RTCPeerConnections
// after a new track has been added to an RTCRtpReceiver which is part of the connection.
pc.addEventListener('track', (e) => {
  console.log('On track (2 times : video and audio)')
  const remoteVideo = document.getElementById('remote-video')
  if (!remoteVideo.srcObject && e.track) {
    // eslint-disable-next-line no-undef
    remoteVideo.srcObject = new MediaStream([e.track])
  } else if (e.track) {
    // eslint-disable-next-line no-undef
    const newMediaStream = new MediaStream([...remoteVideo.srcObject.getTracks(), e.track])
    remoteVideo.srcObject = newMediaStream
  }
}, false)
onPeerconnectSignaling({ pc })

export default pc
