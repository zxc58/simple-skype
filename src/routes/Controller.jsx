import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
export function AuthController (props) {
  const { hasRegister } = props
  return hasRegister ? <Outlet/> : <Navigate to='/register'/>
}
