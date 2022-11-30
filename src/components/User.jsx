/* eslint-disable no-unused-vars */
import React from 'react'
import socket from '../functions/socket'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
export default function User (props) {
  const { name, id } = props
  const invite = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    document.getElementById('my-video').srcObject = stream
    // socket.emit('invite', id)
  }
  return (
    <ListGroup.Item className='text-center border border-secondary' action variant="primary" onClick={invite}>{name}</ListGroup.Item>
  )
}
