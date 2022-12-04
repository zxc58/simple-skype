import { createLocalStream } from './helpers'
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

//

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

//

socket.on('peerconnectSignaling', async ({ desc, candidate }) => {
  // desc 指的是 Offer 與 Answer
  // currentRemoteDescription 代表的是最近一次連線成功的相關訊息
  if (desc && !pc.currentRemoteDescription) {
    console.log('pc.setRemoteDescription: ' + desc.type)
    // eslint-disable-next-line no-undef
    await pc.setRemoteDescription(new RTCSessionDescription(desc))
    await createSignal(desc.type === 'answer')
  } else if (candidate) {
    console.log('pc.addIceCandidate')
    // 新增對方 IP 候選位置
    // eslint-disable-next-line no-undef
    pc.addIceCandidate(new RTCIceCandidate(candidate))
  }
})

//
export const enableMyVideo = async () => {
  const localStream = await createLocalStream()
  document.getElementById('local-video').srcObject = localStream
  localStream.getTracks().forEach(track => {
    console.log('pc add track')
    pc.addTrack(track)
  })
}

export const onInvite = ({ setInvitation }) => socket.on('invite', ({ name, roomId }) => {
  setInvitation({ name, roomId })
})
export const onDisplay = ({ setUsers }) =>
  socket.on('display', (user) => {
    setUsers(prevUsers => {
      const i = prevUsers.find(e => e.id === user.id)
      if (!i) { return [...prevUsers, user] }
      return [...prevUsers]
    })
  })

export const onHide = ({ setUsers }) => socket.on('hide', (userId) => {
  setUsers(prevUsers => {
    const newUsers = prevUsers.filter(e => e.id !== userId)
    return newUsers
  })
})

//

export async function createSignal (isOffer) {
  try {
    if (!pc) {
      return
    }
    // 呼叫 peerConnect 內的 createOffer / createAnswer
    const signalOption = {
      offerToReceiveAudio: 1, // 是否傳送聲音流給對方
      offerToReceiveVideo: 1 // 是否傳送影像流給對方
    }
    const offer = await pc[`create${isOffer ? 'Offer' : 'Answer'}`](signalOption)
    console.log(isOffer ? 'Offer' : 'Answer')
    // 設定本地流配置
    await pc.setLocalDescription(offer)
    const desc = pc.localDescription
    socket.emit('peerconnectSignaling', { desc })
  } catch (err) {
    console.log(err)
  }
}
