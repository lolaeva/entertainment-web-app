import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/logo.svg'
import loginService from '../services/loginService'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  let from = location.state?.from?.pathname || '/'


  const signup = async (e) => {
    e.preventDefault()
    const user = await loginService.signup({email, password})
    if(user.token) {
      localStorage.setItem('user-token', user.token)
      navigate(from, { replace: true })
    }
  }

  const checkPassword = () => {

  }

  return (
    <div className="signup login-section">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-section__content">
        <h1>Sign Up</h1>
        <form>
          <input
            className="input"
            type="email"
            placeholder="Email address"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Repeat password"
            onInput={(e) => checkPassword(e.target.value)}
          />
          <button className="button" onClick={signup}>
            Signup
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
