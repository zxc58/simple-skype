import React, { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { createRoom } from '../global/helpers'
import List from '../components/List'
import Invitation from '../components/Invitation'
import Video from '../components/Video'
import effectHook from '../hooks/effect'
import '../css/main.css'
//
export const StatusContext = React.createContext()
const maxCol = 2
export default function Main (props) {
  const { name } = props
  const [videos, setVideos] = useState([])
  const [room, setRoom] = useState(null)
  const [invitation, setInvitation] = useState(null)
  effectHook.room({ room, setRoom, invitation, setInvitation, videos, setVideos })
  effectHook.invitation({ setInvitation, videos, setVideos })
  const eventHandler = {
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
    <StatusContext.Provider value={{ name, room, setRoom, start: eventHandler.start }}>
      <Container>
        <Row>
          <Col lg={2} className='px-0 bg-light video-col border-end'>
            <List/>
            <footer>
              <Button size='lg' className={!room ? 'rounded-pill' : 'd-none'} onClick={eventHandler.start}>Start</Button>
              <Button size='lg' variant='danger' className={room ? 'rounded-pill' : 'd-none'} onClick={eventHandler.leave}>Leave</Button>
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
