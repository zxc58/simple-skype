/* eslint-env browser */
import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { createRoom, createInvitation } from '../global/helpers'
import { socket, videoControl, pcControl } from '../global/instance'
import List from '../components/List'
import Invitation from '../components/Invitation'
import Video from '../components/Video'
import '../css/main.css'
//
const maxCol = 2
const roomSize = process.env.REACT_APP_ROOM_SIZE ?? 4
export const StatusContext = React.createContext()
export default function Main (props) {
  const { name } = props
  const [videos, setVideos] = useState([])
  const [room, setRoom] = useState(null)
  const [invitation, setInvitation] = useState(null)
  // useEffect
  useEffect(() => {
    socket.on('invite', (invitation) => { setInvitation(invitation) })

    socket.on('peerconnectSignaling', async ({ recipientId, senderId, desc, candidate }) => {
      const pc = pcControl.adapter.get(senderId)
      console.log(pc);
      // const video = videos.find(e => e.id === senderId);
      // if (!video) { console.log('no pc'); return socket.emit('return', 'peerconnectSignaling', { recipientId, senderId, desc, candidate }) };
      ([recipientId, senderId] = [senderId, recipientId])
      // const pc = video.pc
      if (desc) {
        await pc.setRemoteDescription(new RTCSessionDescription(desc))
        if (!(desc.type === 'answer')) { await pcControl.createSignal({ pc, type: 'Answer', senderId, recipientId }) }
      } else if (candidate) {
        // eslint-disable-next-line no-undef
        await pc.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    socket.on('newOneJoin', async (socketId) => {
      if (videos.length > roomSize) { return }
      const [pc, stream] = [pcControl.createPc(), new MediaStream()]
      pcControl.adapter.set(socketId, pc)
      const newVideo = { id: socketId, type: 'remote video', pc, stream }
      setVideos(prev => [...prev, newVideo])
    })
  }, [])
  useEffect(() => {
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
            setVideos([{ id: socket.id, type: 'local-video', stream: localStream }])
            const invitation = createInvitation({ room })
            socket.emit('invite', invitation)
          })
          break
        case 'accept invite':
          socket.emit('joinRoom', room, async (result) => {
            if (!result) { setRoom(false); setInvitation(null); return }
            const socketIdArray = result.filter(e => e !== socket.id)
            if (!videoControl.getLocalVideoStream()) { await videoControl.enableLocalVideo() }
            const b = socketIdArray.map(e => ({ id: e, pc: pcControl.createPc(e), stream: new MediaStream(), type: 'remote video', sendOffer: true }))
            b.unshift({ id: socket.id, type: 'local-video', stream: videoControl.getLocalVideoStream() })
            setTimeout(() =>
              setVideos(b), 2000)
          })
          break
      }
    } else {
      if (room === false) { window.alert('Room is fullyBooked') } else { /* videoControl.disableRemoteVideo(); videoControl.disableLocalVideo() */ }
    }
  }, [room])
  //
  const clickEventHandler = {
    start: () => {
      setRoom(createRoom()) // require back end create a room
    },
    leave: () => {
      setVideos([])
      setRoom(null)
      setInvitation(null)
    }
  }

  return (
    <StatusContext.Provider value={{ name, room, setRoom, start: clickEventHandler.start }}>
      <Container>
        <Row>
          <Col lg={2} className='px-0 bg-light video-col border-end'>
            <List/>
            <footer>
              <Button size='lg' className={!room ? 'rounded-pill' : 'd-none'} onClick={clickEventHandler.start}>Start</Button>
              <Button size='lg' variant='danger' className={room ? 'rounded-pill' : 'd-none'} onClick={clickEventHandler.leave}>Leave</Button>
            </footer>
          </Col>
          <Col lg={10} className={videos.length > maxCol ? `row bg-black row-cols-${maxCol}` : 'row bg-black'}>
            {/* <Row className=' row-cols-3'> */}
            {/* <Col className='bg-white'>qwe</Col><Col className='bg-light'>asd</Col><Col className='bg-white'>zxc</Col>
            <Col className='bg-white'>123</Col> */}
              {videos.length > 0 ? videos.map(e => <Video key={e.id} config={e} count={videos.length}/>) : null}
            {/* </Row> */}
          </Col>
        </Row>
      </Container>
      {invitation && !room ? <Invitation invitation={invitation} setInvitation={setInvitation}/> : null}
    </StatusContext.Provider>
  )
}
