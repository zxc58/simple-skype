import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const AuthController = (props) => props.name ? <Outlet/> : <Navigate to='/register'/>
