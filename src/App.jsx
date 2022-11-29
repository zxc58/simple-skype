/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './routes/Register'
import { AuthController } from './routes/Controller'
import Main from './routes/Main'
import socket from './functions/socket'
export const Context = React.createContext()
function App () {
  const [name, setName] = useState(null)
  return (
    <Context.Provider value={{ socket }}>
      <HashRouter>
        <Routes>
            <Route path='/register' element={<Register setName={setName}/>} />
            <Route element={<AuthController name={name}/>}>
              <Route path='/' element={<Main name={name}/>}/>
            </Route>
        </Routes>
      </HashRouter>
    </Context.Provider>
  )
}

export default App
