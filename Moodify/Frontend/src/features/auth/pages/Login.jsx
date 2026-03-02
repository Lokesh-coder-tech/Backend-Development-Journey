import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'

const Login = () => {
  return (
  <div className="Login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <FormGroup className="form-group" label="Email" placeholder="Enter your email" />
          <FormGroup className="form-group" label="Password" placeholder="Enter your password" />
          <button className='button' type='submit'>Login</button>
        </form>
      </div>
  </div>
  )
}

export default Login
