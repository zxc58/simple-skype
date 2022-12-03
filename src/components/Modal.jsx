import pc from '../functions/peerConnection'
import socket, { createSignal } from '../functions/socket'
import { StatusContext } from '../routes/Main'
import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import '../css/modal.css'

function Notice (props) {
  const { user: { name, roomId }, setModal } = props
  const { setIsInRoom } = useContext(StatusContext)
  const accept = () => {
    socket.emit('joinRoom', roomId, async () => {
      setIsInRoom('inviting')
      createSignal(pc)(true)
    })
  }
  return (
    <Modal.Dialog size='sm' className='invite-modal'>
      <Modal.Body>
        <p className='mx-1'>
          <span className='fs-3 text-danger'>{name + ' '}</span>
          invites you a meet
        </p>
      </Modal.Body>
      <Modal.Footer className='mx-1'>
        <Button variant="secondary" onClick={() => setModal(null)}>Reject</Button>
        <Button variant="primary" onClick={accept}>Accept</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Notice
