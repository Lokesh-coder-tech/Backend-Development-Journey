import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className='nav-bar'>
      <h1>Insta</h1>
      <button onClick={() => navigate("/create-post")}>Create Post</button>
    </div>
  )
}

export default Nav
