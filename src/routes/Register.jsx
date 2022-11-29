/* eslint-disable no-unused-vars */
import React, { useState, userContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { registerUser } from '../functions/event-listener'
import '../CSS/register.css'
export default function Register (props) {
  const { setName } = props
  const navigate = useNavigate()
  return (
    <>
      <h1 className='text-center'>Register</h1>
      <form className='mt-3 text-center' id='register-form' onSubmit={registerUser(setName, navigate)}>
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
    </>
  )
}
