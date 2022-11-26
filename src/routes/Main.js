/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import io from 'socket.io-client'
import List from '../components/List'
const socket = io('http://localhost:3000')
export default function Main (props) {
  return (
    <>
      <button>Start</button>
      <video className='video'></video>
      {/* <List /> */}
    </>
  )
}
