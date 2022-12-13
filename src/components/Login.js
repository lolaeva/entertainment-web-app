import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/logo.svg'

import loginService from '../services/loginService'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('login', email, password);
    const user = await loginService.login({email, password})
    console.log("🚀 ~ file: Login.js:21 ~ handleLogin ~ user", user)
  }


  return (
    <div className="login-section">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-section__content">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={email}
            onInput={({ target }) => setEmail(target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onInput={({ target }) => setPassword(target.value)}
          />
          <button className="button">Login to your account</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
