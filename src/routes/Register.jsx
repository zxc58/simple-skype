import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InputGroup, Form, Button, Container } from 'react-bootstrap'
import { socket } from '../global/instance'
import '../css/register.css'
export default function Register (props) {
  const { setName } = props
  const navigate = useNavigate()
  const registerUser = (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    socket.emit('register', name)
    setName(name)
    navigate('/')
  }
  return (
    <Container>
      <h1 className='text-center'>Register</h1>
      <form className='mt-3 text-center' id='register-form' onSubmit={registerUser}>
        <InputGroup className="mb-3">
          <Form.Control
            maxLength={10}
            id='name'
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon2"
          />
          <Button type='submit' variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
      </form>
    </Container>
  )
}
