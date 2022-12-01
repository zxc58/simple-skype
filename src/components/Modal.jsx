import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../CSS/modal.css'
function Notice (props) {
  const { other, setOther } = props
  return (
    <Modal.Dialog className='Modal' size='lg'>
      <Modal.Body>
        <p>
          <span className='fs-3 text-danger'>{other.name}</span>
          invites you a meet
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOther(null)}>Reject</Button>
        <Button variant="primary">Accept</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Notice
