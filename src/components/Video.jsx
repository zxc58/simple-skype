/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import '../css/video.css'
export default function Video (props) {
  const { config } = props
  const { id, stream, type } = config
  useEffect(() => {
    const a = document.getElementById(id)
    a.srcObject = stream
  }, [])
  return (
    <Col className='text-center'>
        <video className={type} id={id} autoPlay></video>
    </Col>
  )
}
