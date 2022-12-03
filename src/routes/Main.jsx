/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import List from '../components/List'
import Notice from '../components/Modal'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../css/main.css'
import { roomSideEffect, modalSideEffect } from '../hooks/effect'
export const StatusContext = React.createContext()
// state = pending,idling
export default function Main (props) {
  const [isInRoom, setIsInRoom] = useState(null)
  const [modal, setModal] = useState(null)
  roomSideEffect(isInRoom)
  modalSideEffect(setModal)
  return (
    <StatusContext.Provider value={{ isInRoom, setIsInRoom }}>
      <Container>
        <Row>
          <Col sm={5} className='bg-black video-col d-flex align-items-center border-end border-white'>
            <div className='w-100 text-center'>
              <Button size='lg' className={!isInRoom ? 'rounded-pill' : 'd-none'} onClick={() => setIsInRoom(true)}>Start</Button>
              <video className={isInRoom ? 'videos' : 'd-none'} id='local-video' autoPlay ></video><br/>
              <Button size='lg' variant='danger' className={isInRoom ? 'rounded-circle' : 'd-none'} onClick={() => setIsInRoom(false)}>End</Button>
            </div>
          </Col>
          <Col sm={5} className='bg-black video-col d-flex align-items-center  '>
            <div className='w-100 text-center'>
              <video className='videos' id='remote-video' autoPlay ></video>
            </div>
          </Col>
          <Col sm={2} className='bg-light video-col'>
            <List/>
          </Col>
        </Row>
      </Container>
      {modal && !isInRoom ? <Notice user={modal} setModal={setModal}/> : null}
    </StatusContext.Provider>
  )
}
