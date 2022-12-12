import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { socket, pcControl } from '../global/instance'
export default function Video (props) {
  const { config, videoCount } = props
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
  const danamicStyle = {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: type === 'local-video' ? 'blue' : '',
    height: videoCount > 2 ? '300px' : '600px',
    maxWidth: '100%'
  }
  return (
    <Col className='text-center'>
      <video style={danamicStyle} id={id} autoPlay></video>
    </Col>
  )
}
