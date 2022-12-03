import { io } from 'socket.io-client'
// import pc from './peerConnection'
import { createLocalStream } from './helpers'
const socket = io(process.env.REACT_APP_BACKEND)
export default socket

export const onInvite = (pc) => socket.on('invite', ({ name, roomId }) => {
  // create madal that ask user weather join room
  socket.emit('joinRoom', roomId, async () => {
    // localStream = await createLocalStream()
    document.getElementById('local-video').srcObject = (await createLocalStream())
    createSignal(pc)(true)
  })
})

export const onPeerconnectSignaling = ({ pc }) => socket.on('peerconnectSignaling', async ({ desc, candidate }) => {
  // desc 指的是 Offer 與 Answer
  // currentRemoteDescription 代表的是最近一次連線成功的相關訊息
  if (desc && !pc.currentRemoteDescription) {
    // eslint-disable-next-line no-undef
    await pc.setRemoteDescription(new RTCSessionDescription(desc))
    await createSignal(pc)(desc.type === 'answer')
  } else if (candidate) {
    // 新增對方 IP 候選位置
    // eslint-disable-next-line no-undef
    pc.addIceCandidate(new RTCIceCandidate(candidate))
  }
})

//

export function createSignal (pc) {
  return async (isOffer) => {
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
}
//
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
