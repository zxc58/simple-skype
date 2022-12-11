/* eslint-disable no-unused-vars */
/* eslint-env browser */
import { useEffect } from 'react'
import { socket, socketOn, createSignal, videoControl, createPc } from '../global/instance'
import { createInvitation, createLocalStream } from '../global/helpers'
const effectHook = {
  invitation: ({ setInvitation, videos, setVideos }) => useEffect(() => {
    socketOn.invite({ setInvitation })
    socketOn.newOneJoin({ videos, setVideos })
  }, []),

  room: ({ room, invitation, videos, setRoom, setInvitation, setVideos }) => useEffect(() => {
    if (room) {
      const { action } = room
      switch (action) {
        case 'create':
          socket.emit('joinRoom', room, async (room) => {
            await videoControl.enableLocalVideo()
            const localStream = videoControl.getLocalVideoStream()
            setVideos([{ id: socket.id, type: 'local-video', stream: localStream }])
          })
          break
        case 'create+invite':
          socket.emit('joinRoom', room, async () => {
            await videoControl.enableLocalVideo()
            const localStream = videoControl.getLocalVideoStream()
            setVideos([{ id: socket.id, type: 'local video', stream: localStream }])
            const invitation = createInvitation({ room })
            socket.emit('invite', invitation)
          })
          break
        case 'accept invite':
          socket.emit('joinRoom', room, async (result) => {
            if (!result) { setRoom(false); setInvitation(null); return }
            const socketIdArray = result.filter(e => e !== socket.id)
            if (!videoControl.getLocalVideoStream()) { await videoControl.enableLocalVideo() }
            const b = socketIdArray.map(e => ({ id: e, pc: createPc(e), stream: new MediaStream(), type: 'remote video', sendOffer: true }))
            b.unshift({ id: socket.id, type: 'local video', stream: videoControl.getLocalVideoStream() })
            setVideos(b)
          })
          break
      }
    } else {
      if (room === false) { window.alert('Room is fullyBooked') } else { /* videoControl.disableRemoteVideo(); videoControl.disableLocalVideo() */ }
    }
  }, [room]),

  users: (setUsers) => useEffect(() => {
    socketOn.display({ setUsers })
    socketOn.hide({ setUsers })
    socketOn.toggleBusy({ setUsers })
    socket.emit('getUsers', (response) => {
      setUsers(response.filter(e => e.id !== socket.id && e.name))
    })
  }, [])
}
export default effectHook
