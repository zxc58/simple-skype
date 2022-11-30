/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import List from '../components/List'
import { myVideo } from '../functions/button'
import { Button, Badge, Container, Row, Col } from 'react-bootstrap'
import '../CSS/main.css'
import socket from '../functions/socket'
// import Not from "";
import Notice from '../components/Modal'
export default function Main (props) {
  const { name } = props
  // const [modal, setModal] = useState(false)

  return (
    <Container>
      <Row>
        <Col sm={10} className='text-center'>
          {/* {modal?</>:null} */}
          <h1 >
            {name}
            {/* <Button variant="primary" onClick={myVideo} >Start</Button> */}
          </h1>
          <video className='videos' id='my-video' autoPlay ></video>
          <br/>
          <video className='videos' id='other-video' autoPlay ></video>
        </Col>
        <Col sm={2}>
          <List/>
        </Col>
      </Row>
    </Container>
  )
}
