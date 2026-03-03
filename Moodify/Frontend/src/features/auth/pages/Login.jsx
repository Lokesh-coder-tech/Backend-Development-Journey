import React, {useState} from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import {Link, useNavigate} from 'react-router'
import {useAuth} from "../hooks/useAuth"

const Login = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    await handleLogin({email, password})
    navigate("/")
  }

  return (
  <div className="Login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup 
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-group" label="Email" placeholder="Enter your email" />
          <FormGroup 
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="form-group" label="Password" placeholder="Enter your password" />
          <button className='button' type='submit'>Login</button>
        </form>
        <p>Don't have account? <Link to="/register">Register</Link></p>
      </div>
  </div>
  )
}

export default Login
