import React from 'react'
import { useState } from 'react'
import '../style/form.css'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
  
  const {user, loading, handleRegister} = useAuth()

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const Navigate = useNavigate()

 async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister(username, email, password)

    Navigate('/')
  }
  if(loading){
    return(<main>
      <h1>loading...</h1>
    </main>)
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
