/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './routes/Register'
import { AuthController } from './routes/Controller'
import Main from './routes/Main'
function App () {
  const [name, setName] = useState(null)
  return (
    <HashRouter>
      <Routes>
          <Route path='/register' element={<Register setName={setName}/>} />
          <Route element={<AuthController name={name}/>}>
            <Route path='/' element={<Main/>}/>
          </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
