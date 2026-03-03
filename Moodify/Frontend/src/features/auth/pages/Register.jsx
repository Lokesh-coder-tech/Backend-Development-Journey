import React, {useState} from 'react'
import "../style/register.scss"
import FormGroup from "../components/FormGroup"
import {Link, useNavigate} from 'react-router'
import {useAuth} from "../hooks/useAuth"

const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

 const {loading, handleRegister} = useAuth()

 const Navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    await handleRegister({username, email, password})

    Navigate("/")
  }

  return (
   <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
           <FormGroup
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="form-group" 
          label="Name" placeholder="Enter your name" />
          <FormGroup 
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-group" 
          label="Email" placeholder="Enter your email" />
          <FormGroup 
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="form-group" 
          label="Password" placeholder="Enter your password" />
          <button className='button' type='submit'>Register</button>
        </form>
        <p>Already have an account <Link to="/login">Login</Link></p>
      </div>
  </div>
  )
}

export default Register
