import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { StatusContext } from '../routes/Main'
import '../css/modal.css'
//
function Invitation (props) {
  const { user: { name, roomId }, setInvitation } = props
  const { setRoomId } = useContext(StatusContext)
  const eventHandler = {
    accept: () => {
      setRoomId(roomId)
    },
    reject: () => setInvitation(null)
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
        <Button variant="secondary" onClick={eventHandler.reject}>Reject</Button>
        <Button variant="primary" onClick={eventHandler.accept}>Accept</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Invitation
