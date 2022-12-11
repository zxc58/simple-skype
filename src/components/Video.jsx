/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { videoControl, createSignal, socket } from '../global/instance'
import '../css/video.css'
export default function Video (props) {
  const { config } = props
  const { id, stream, type, pc, sendOffer } = config

  useEffect(() => {
    const video = document.getElementById(id)
    if (!pc) { // type === 'local video'
      if (stream) {
        video.srcObject = stream
      } else {
        console.log('local stream is null')
      }
    } else if (pc) { // type === 'remote video'
      if (pc.remoteDescription) { video.srcObject = stream; return }
      if (sendOffer) {
        console.log('sendOffer: ')
        console.log(sendOffer)
        createSignal({ pc, recipientId: id, senderId: socket.id, type: 'Offer' })
      }
    }
  }, [])

  return (
    <Col className='text-center'>
      <video className={type} id={id} autoPlay></video>
    </Col>
  )
}
