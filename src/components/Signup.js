import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/logo.svg'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = (e) => {
    e.preventDefault()
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
