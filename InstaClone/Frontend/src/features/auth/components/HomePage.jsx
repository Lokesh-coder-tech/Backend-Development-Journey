import React from 'react'
import {Link} from "react-router"
import '../style/home.scss'

const HomePage = () => {
  return (
   <main>
      <h1>Welcome to Instagram Clone</h1>
     <div className='btns'>
        <button><Link to='/login'>Login</Link></button>
        <button ><Link to='/register'>Register</Link></button>
      </div>
   </main>
  )
}

export default HomePage
