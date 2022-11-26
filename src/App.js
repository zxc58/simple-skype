/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './routes/Register'
import { AuthController } from './routes/Controller'
import Main from './routes/Main'
import './App.css'

import io from 'socket.io-client'

function App () {
  const [hasRegister, setHasRegister] = useState(true)
  return (
    <HashRouter>
      <Routes>
          <Route path='/register' element={<Register/>} />
          <Route element={<AuthController hasRegister={hasRegister}/>}>
            <Route path='/' element={<Main/>}/>
          </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
