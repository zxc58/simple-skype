/* eslint-disable no-unused-vars */
import React from 'react'
import User from './User'
export default function List (props) {
  const users = []
  const userComponents = users.map(e => <User key={e.key} user={e}/>)
  return (
    <ul>
      {userComponents}
    </ul>
  )
}
