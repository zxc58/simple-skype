import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { socket, pcControl } from '../global/instance'
import '../css/video.css'
export default function Video (props) {
  const { config } = props
  const { id, stream, type, pc, sendOffer } = config

  useEffect(() => {
    const video = document.getElementById(id)
    if (!pc) { // type === 'local video'
      if (stream) {
        video.srcObject = stream
      }
    } else if (pc) { // type === 'remote video'
      video.srcObject = stream
      if (!pc.remoteDescription && sendOffer) {
        pcControl.createSignal({ pc, recipientId: id, senderId: socket.id, type: 'Offer' })
      }
    }
  }, [])

  return (
    <Col className='text-center'>
      <video className={type} id={id} autoPlay></video>
    </Col>
  )
}
