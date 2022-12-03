/* eslint-disable no-unused-vars */
import { createLocalStream } from './helpers'
import socket, { onPeerconnectSignaling } from './socket'
// eslint-disable-next-line prefer-const
const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
  }]
}

// eslint-disable-next-line no-undef
const pc = new RTCPeerConnection(configuration)
pc.onicecandidate = ({ candidate }) => { // 當通過 RTCPeerConnection.setLocalDescription()方法更改本地描述之後icecandidate 事件
  if (!candidate) { return }
  socket.emit('peerconnectSignaling', { candidate })
}

// The track event is sent to the ontrack event handler on RTCPeerConnections
// after a new track has been added to an RTCRtpReceiver which is part of the connection.
pc.addEventListener('track', (e) => {
  // console.log(e.track)
  const remoteVideo = document.getElementById('remote-video')
  if (!remoteVideo.srcObject && e.track) {
    console.log(0)
    // eslint-disable-next-line no-undef
    remoteVideo.srcObject = new MediaStream([e.track])
  } else if (e.track) {
    console.log([...remoteVideo.srcObject.getTracks(), e.track])
    // eslint-disable-next-line no-undef
    const newMediaStream = new MediaStream([...remoteVideo.srcObject.getTracks(), e.track])
    remoteVideo.srcObject = newMediaStream
  }
}, false)
onPeerconnectSignaling({ pc })

export default pc
