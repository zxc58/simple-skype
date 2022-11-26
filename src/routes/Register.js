/* eslint-disable no-unused-vars */
import React, { useState, userContext } from 'react'
export default function Register (props) {
  return (
        <form id='register-form'>
            <label htmlFor='name'>Name:</label><br/>
            <input type='text' placeholder='Enter name' name='name' id='name'/>
            <button type="submit" >Submit</button>
        </form>
  )
}
