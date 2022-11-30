import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function Notice (props) {
  const { user } = props
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>You have an invite</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{user.name}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Reject</Button>
        <Button variant="primary">Accept</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Notice
