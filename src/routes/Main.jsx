/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from 'react'
import List from '../components/List'
import { Button, Badge, Container, Row, Col, Alert } from 'react-bootstrap'
import '../CSS/main.css'
import socket from '../functions/socket'
import Modal from '../components/Modal'
import { useEffectCreateRoom } from '../functions/useEffects'
export const StatusContext = React.createContext()
export default function Main (props) {
  const { name } = props
  const [isInRoom, setIsInRoom] = useState(false)
  useEffectCreateRoom(isInRoom)
  return (
    <StatusContext.Provider isInRoom={isInRoom} setIsInRoom={setIsInRoom}>
      <Container>
        <Row >
          <Col sm={5} className='bg-black video-col d-flex align-items-center border-end border-white'>
            <div className='w-100 text-center'>
              {!isInRoom
                ? <Button size='lg' className='rounded-pill video-btn ' onClick={() => setIsInRoom(true)}>Start</Button>
                : <video className='videos w-100' id='my-video' autoPlay ></video>
              }
            </div>
          </Col>
          <Col sm={5} className='bg-black video-col d-flex align-items-center  '>
            <div className='w-100 text-center'>
              <video className='videos w-100' id='other-video' autoPlay ></video>
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
