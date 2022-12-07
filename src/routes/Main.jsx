import React, { useState } from 'react'
import { createRoom } from '../global/helpers'
import List from '../components/List'
import Invitation from '../components/Invitation'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../css/main.css'
import { roomSideEffect, modalSideEffect } from '../hooks/effect'
export const StatusContext = React.createContext()
export default function Main (props) {
  const { name } = props
  const [room, setRoom] = useState(null)
  const [invitation, setInvitation] = useState(null)
  roomSideEffect({ room, setRoom, invitation, setInvitation })
  modalSideEffect(setInvitation)
  const eventHandler = {
    start: () => setRoom(createRoom()),
    leave: () => {
      setRoom(null)
      setInvitation(null)
    }
  }

  return (
    <StatusContext.Provider value={{ name, room, setRoom, start: eventHandler.start }}>
      <Container>
        <Row>
          <Col sm={5} className='bg-black video-col d-flex align-items-center border-end border-white'>
            <div className='w-100 text-center'>
              <Button size='lg' className={!room ? 'rounded-pill' : 'd-none'} onClick={eventHandler.start}>Start</Button>
              <video className={room ? 'videos' : 'd-none'} id='local-video' autoPlay ></video>
              <Button size='lg' variant='danger' className={room ? 'rounded-circle' : 'd-none'} onClick={eventHandler.leave}>Leave</Button>
            </div>
          </Col>
          <Col sm={5} className='bg-black video-col d-flex align-items-center  '>
            <div className='w-100 text-center'>
              <p className={!room ? 'text-white fs-1' : 'd-none'}>Click user to invite.</p>
              <video className='videos' id='remote-video' autoPlay ></video>
            </div>
          </Col>
          <Col sm={2} className='px-0 bg-light video-col'>
            <List/>
          </Col>
        </Row>
      </Container>
      {invitation && !room ? <Invitation invitation={invitation} setInvitation={setInvitation}/> : null}
    </StatusContext.Provider>
  )
}
