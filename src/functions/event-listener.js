/* eslint-disable no-unused-vars */
import axios from 'axios'
export const registerUser = (setName, navigate) => async (e) => {
  e.preventDefault()
  setName(document.getElementById('name').value)
  navigate('/')
}
