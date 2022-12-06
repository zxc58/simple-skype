/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import List from '../components/List'
import Invitation from '../components/Invitation'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../css/main.css'
import { roomSideEffect, modalSideEffect } from '../hooks/effect'
export const StatusContext = React.createContext()
export default function Main (props) {
  const [roomId, setRoomId] = useState(false)
  const [invitation, setInvitation] = useState(null)
  roomSideEffect({ roomId, invitation })
  modalSideEffect(setInvitation)
  const eventHandler = {
    start: () => setRoomId(uuidv4()),
    leave: () => {
      setRoomId(null)
      setInvitation(null)
    }
  }

  return (
    <StatusContext.Provider value={{ roomId, setRoomId, start: eventHandler.start }}>
      <Container>
        <Row>
          <Col sm={5} className='bg-black video-col d-flex align-items-center border-end border-white'>
            <div className='w-100 text-center'>
              <Button size='lg' className={!roomId ? 'rounded-pill' : 'd-none'} onClick={eventHandler.start}>Start</Button>
              <video className={roomId ? 'videos' : 'd-none'} id='local-video' autoPlay ></video>
              <Button size='lg' variant='danger' className={roomId ? 'rounded-circle' : 'd-none'} onClick={eventHandler.leave}>Leave</Button>
            </div>
          </Col>
          <Col sm={5} className='bg-black video-col d-flex align-items-center  '>
            <div className='w-100 text-center'>
              <p className={!roomId ? 'text-white fs-1' : 'd-none'}>Press start and invite user</p>
              <video className='videos' id='remote-video' autoPlay ></video>
            </div>
          </Col>
          <Col sm={2} className='px-0 bg-light video-col'>
            <List/>
          </Col>
        </Row>
      </Container>
      {invitation && !roomId ? <Invitation user={invitation} setInvitation={setInvitation}/> : null}
    </StatusContext.Provider>
  )
}
