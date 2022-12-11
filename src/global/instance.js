/* eslint-env browser */
import { createLocalStream, roomSize } from './helpers'
import { io } from 'socket.io-client'
// video
let localVideoStream = null
export const videoControl = {
  getLocalVideoStream: () => localVideoStream,
  clearLocalVideoStream: () => { localVideoStream = null },
  enableLocalVideo: async () => {
    try {
      if (localVideoStream) { return }
      localVideoStream = await createLocalStream()
    } catch (error) {
      console.error(error)
    }
  },
  disableLocalVideo: () => {
    if (!localVideoStream) { return }
    localVideoStream.srcObject.getTracks().forEach(track => track.stop())
    localVideoStream.srcObject = null
  },
  disableRemoteVideo: () => {
    const remoteVideo = document.getElementById('remote-video')
    if (!remoteVideo?.srcObject) { return }
    remoteVideo.srcObject.getTracks().forEach(track => track.stop())
    remoteVideo.srcObject = null
  }
}
// socket
export const socket = io(process.env.REACT_APP_BACKEND)
export const socketOn = {
  signal: ({ videos, setVideos }) => socket.on('peerconnectSignaling', async ({ socketId, desc, candidate }) => {
    const video = videos.find(e => e.id === socketId)
    const pc = video?.pc ?? createPc()
    if (desc) {
      // eslint-disable-next-line no-undef
      await pc.setRemoteDescription(new RTCSessionDescription(desc))
      if (!(desc.type === 'answer')) { await createSignal('Answer') }
    } else if (candidate) {
      // eslint-disable-next-line no-undef
      await pc.addIceCandidate(new RTCIceCandidate(candidate))
    }
    if (!video) { setVideos(prev => { return [...prev, { id: socketId, type: 'remote video', pc }] }) }
  }),
  toggleBusy: ({ setUsers }) => socket.on('toggleBusy', (userId) => {
    setUsers(prevUsers => {
      const user = prevUsers.find(e => e.id === userId)
      user.isBusy = !user.isBusy
      return [...prevUsers]
    })
  }),
  hide: ({ setUsers }) => socket.on('hide', (userId) => {
    setUsers(prevUsers => {
      const newUsers = prevUsers.filter(e => e.id !== userId)
      return newUsers
    })
  }),
  display: ({ setUsers }) => socket.on('display', (user) => {
    setUsers(prevUsers => [...prevUsers, { ...user, isBusy: false }])
  }),
  invite: ({ setInvitation }) => socket.on('invite', (invitation) => {
    setInvitation(invitation)
  }),
  leaveRoom: ({ videos, setVideos }) => socket.on('leaveRoom', (leaverId) => {

  }),
  newOneJoin: ({ videos, setVideos }) => socket.on('newOneJoin', async (socketId) => {
    if (videos.length > roomSize) { return }
    const [pc, stream] = [createPc(), new MediaStream()]
    const newVideo = { id: socketId, type: 'remote video', pc, stream }
    setVideos(prev => [...prev, newVideo])
    // await createSignal({ pc, type: 'Offer', recipientId: socketId, senderId: socketId })
  })
}
// pc
export function createPc (id) {
  const configuration = {
    iceServers: [{
      urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
    }]
  }
  const pc = new RTCPeerConnection(configuration)

  pc.ontrack = ({ track }) => {
    const a = document.getElementById(id)
    if (track && a.srcObject) { a.srcObject.addTrack(track) }
  }
  videoControl.getLocalVideoStream().getTracks().forEach(track => {
    pc.addTrack(track)
  })
  return pc
}

export async function createSignal ({ pc, type, recipientId, senderId }) {
  try {
    if (!pc || !(type === 'Answer' || type === 'Offer')) { return }
    pc.onicecandidate = ({ candidate }) => { // 當通過 RTCPeerConnection.setLocalDescription()方法更改本地描述之後icecandidate 事件
      if (!(candidate && pc.localDescription)) { return }
      socket.emit('peerconnectSignaling', { candidate, recipientId, senderId })
    }
    const signalOption = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 }
    const offer = await pc[`create${type}`](signalOption)// 呼叫 peerConnect 內的 createOffer / createAnswer
    socket.emit('peerconnectSignaling', { offer, recipientId, senderId }, async () => {
      await pc.setLocalDescription(offer)// 設定本地流配置
    })
  } catch (err) {
    console.log(err)
  }
}
