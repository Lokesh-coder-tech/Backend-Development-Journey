import React from 'react'
import { useState } from 'react'
import '../style/form.css'
import { Link } from 'react-router'   
import axios from 'axios'

const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

  }

  return (
   <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
        onInput={(e) => setusername(e.target.value)} 
        type="text" 
        name="username" 
        placeholder="Enter username" />
        <input 
        onInput={(e) => setemail(e.target.value)}
        type="email" 
        name="email" 
        placeholder="Enter email" />
        <input
        onInput={(e) => setpassword(e.target.value)} 
        type="password" 
        name="password" 
        placeholder="Password" />
        <button type='submit'>Register</button>
      </form>
      <p>Already have an account? <Link className='toggleAuth' to="/login">Login</Link></p>
    </div>
   </main>
  )
}

export default Register
