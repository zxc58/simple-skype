/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
// import List from '../components/List'
import { myVideo } from '../functions/button'
import { Button, Badge } from 'react-bootstrap'
import '../CSS/main.css'
export default function Main (props) {
  return (
    <>
        <div>
          <Button variant="primary" onClick={myVideo} size='lg'>Start</Button>
        </div>
        <video id='my-video' autoPlay ></video>
      {/* <List /> */}
    </>
  )
}
