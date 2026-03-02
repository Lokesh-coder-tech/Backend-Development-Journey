import React from 'react'
import "../style/register.scss"
import FormGroup from "../components/FormGroup"

const Register = () => {
  return (
   <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>
           <FormGroup className="form-group" label="Name" placeholder="Enter your name" />
          <FormGroup className="form-group" label="Email" placeholder="Enter your email" />
          <FormGroup className="form-group" label="Password" placeholder="Enter your password" />
          <button className='button' type='submit'>Login</button>
        </form>
      </div>
  </div>
  )
}

export default Register
