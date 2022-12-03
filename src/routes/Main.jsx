/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from 'react'
import List from '../components/List'
import { Button, Badge, Container, Row, Col, Alert } from 'react-bootstrap'
import '../css/main.css'
// import socket from '../functions/socket'
// import Modal from '../components/Modal'
import { roomSideEffect } from '../functions/useEffects'
export const StatusContext = React.createContext()
export default function Main (props) {
  const { name } = props
  const [isInRoom, setIsInRoom] = useState(null)
  roomSideEffect(isInRoom)
  return (
    <StatusContext.Provider value={{ isInRoom, setIsInRoom }}>
      <Container>
        <Row >
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
    </StatusContext.Provider>
  )
}
