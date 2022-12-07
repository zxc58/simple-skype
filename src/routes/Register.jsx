/* eslint-disable no-unused-vars */
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
    <Container style={{ maxWidth: '600px' }}>
      <h1 className='text-center py-6'>Register</h1>
      {/* <form className='mt-3 text-center' id='register-form' onSubmit={registerUser}> */}
      <Form className='text-center'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
          type="text" placeholder="Name"
          maxLength={10} id='name' required={true}/>
          <br/>
          <Button type='submit' variant="primary" id="button-addon2">Button</Button>
        </Form.Group>
      </Form>
        {/* <InputGroup className="mb-3">
          <Form.Control
            maxLength={10}
            id='name'
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon2"
          /> */}
        {/* </InputGroup> */}

      {/* </form> */}
    </Container>
  )
}
