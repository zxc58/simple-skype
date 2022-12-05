/* eslint-disable no-unused-vars */
import { createLocalStream } from './helpers'
import { io } from 'socket.io-client'
//
let pc
export const socket = io(process.env.REACT_APP_BACKEND)
//
export function initPc () {
  if (pc) { pc.close() }
  const configuration = {
    iceServers: [{
      urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
    }]
  }
  // eslint-disable-next-line no-undef
  pc = new RTCPeerConnection(configuration)
  pc.onicecandidate = ({ candidate }) => { // 當通過 RTCPeerConnection.setLocalDescription()方法更改本地描述之後icecandidate 事件
    if (!candidate) { return }
    socket.emit('peerconnectSignaling', { candidate })
  }
  pc.ontrack = ({ track }) => {
    if (!track) { return }
    const remoteVideo = document.getElementById('remote-video')
    if (!remoteVideo.srcObject) {
      // eslint-disable-next-line no-undef
      remoteVideo.srcObject = new MediaStream()
    }
    remoteVideo.srcObject.addTrack(track)
  }
}
//
socket.on('peerconnectSignaling', async ({ desc, candidate }) => {
  // desc 指的是 Offer 與 Answer
  // currentRemoteDescription 代表的是最近一次連線成功的相關訊息
  if (desc && !pc.currentRemoteDescription) {
    // eslint-disable-next-line no-undef
    await pc.setRemoteDescription(new RTCSessionDescription(desc))
    await createSignal(desc.type === 'answer')
  } else if (candidate) {
    // eslint-disable-next-line no-undef
    await pc.addIceCandidate(new RTCIceCandidate(candidate))
  }
})
socket.on('leaveRoom', (leaverId) => {
  disableRemoteVideo()
  const localVideo = document.getElementById('local-video')
  initPc()
  localVideo.srcObject.getTracks().forEach(track => {
    pc.addTrack(track)
  })
})
//
export const enableMyVideo = async () => {
  try {
    const localVideo = document.getElementById('local-video')
    if (localVideo.srcObject) { throw new Error('Local video exsit') }
    const localStream = await createLocalStream()
    localVideo.srcObject = localStream
    localStream.getTracks().forEach(track => {
      pc.addTrack(track)
    })
  } catch (error) {
    console.error(error)
  }
}

export const onInvite = ({ setInvitation }) => socket.on('invite', ({ name, roomId }) => {
  setInvitation({ name, roomId })
})

export const onDisplay = ({ setUsers }) => socket.on('display', (user) => {
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
    // 設定本地流配置
    await pc.setLocalDescription(offer)
    const desc = pc.localDescription
    socket.emit('peerconnectSignaling', { desc })
  } catch (err) {
    console.log(err)
  }
}

export function disableRemoteVideo () {
  const remoteVideo = document.getElementById('remote-video')
  if (!remoteVideo.srcObject) { console.error('Remote video do not exsit') }
  remoteVideo.srcObject.getTracks().forEach(track => track.stop())
  remoteVideo.srcObject = null
}
