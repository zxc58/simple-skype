import React from 'react'

export default function User (props) {
  const { name, status } = props
  return (
        <li>
            <a className='user-name' >{name}</a>
            {status === 'pending' ? <span className='pending'>P</span> : null}
        </li>
  )
}
