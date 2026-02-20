import React from 'react'
import { useState } from 'react'
import '../style/form.css'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

  const {user, loading, handleLogin} = useAuth()

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const Navigate = useNavigate()

  async function handlesubmit(e) {
   e.preventDefault()

   await handleLogin(username, password)

   Navigate('/')

  }
  if(loading){
    return (<main>
      <h1>Loading...</h1>
    </main>)
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
