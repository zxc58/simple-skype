import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { StatusContext } from '../routes/Main'
import { invitationToRoom } from '../global/helpers'
import '../css/invitation.css'
//
function Invitation (props) {
  const { invitation, setInvitation } = props
  const { inviterName } = invitation
  const { setRoom } = useContext(StatusContext)
  const eventHandler = {
    accept: () => {
      console.log('accept')
      const room = invitationToRoom(invitation)
      console.log(room)
      setRoom(room)
    },
    reject: () => setInvitation(null)
  }

  return (
    <Modal.Dialog size='sm' className='invitation-modal'>
      <Modal.Body>
        <p className='mx-6'>
          <span className='fs-3 text-danger'>{`${inviterName} `}</span>
          invites you a meet
        </p>
      </Modal.Body>
      <Modal.Footer className='my-1'>
        <Button variant="secondary" className='me-1' onClick={eventHandler.reject}>Reject</Button>
        <Button variant="primary" onClick={eventHandler.accept}>Accept</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Invitation
