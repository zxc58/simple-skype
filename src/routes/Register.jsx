/* eslint-disable no-unused-vars */
import React, { useState, userContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../functions/event-listener'
export default function Register (props) {
  const { setHasRegister: setName } = props
  const navigate = useNavigate()
  return (
    <form id='register-form' onSubmit={registerUser(setName, navigate)}>
        <label htmlFor='name'>Name:</label><br/>
        <input type='text' placeholder='Enter name' name='name' id='name' required/>
        <button type="submit">Submit</button>
    </form>
  )
}
