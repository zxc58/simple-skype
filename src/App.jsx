import React, { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
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
            <Route path='/' element={<Main name={name}/>}/>
          </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
