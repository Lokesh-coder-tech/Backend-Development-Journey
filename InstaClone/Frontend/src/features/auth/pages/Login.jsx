import React from 'react'
import { useState } from 'react'
import '../style/form.css'
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  function handlesubmit(e) {
   e.preventDefault()

   axios.post("http://localhost:3000/api/auth/login",{
    username,
    password,
   }, {
    withCredentials: true,
   })
   .then(res => {
    console.log(res.data);
   })

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <input 
          onInput={(e) => setusername(e.target.value)}
          type="text" 
          name="username" 
          placeholder="Enter username" />
          <input 
          onInput={(e) => setpassword(e.target.value)}
          type="password" 
          name="password" 
          placeholder="Password" />
          <button type='submit'>Login</button>
        </form>
           <p>Don't have an account?<Link className='toggleAuth' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
