import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/logo.svg'
import loginService from '../services/loginService'

const Signup = ({setToken, setNotification}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [error, setError] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  let from = location.state?.from?.pathname || '/'

  const signup = async (e) => {
    e.preventDefault()
    const user = await loginService.signup({ email, password })

    try {
      const user = await loginService.login({ email, password })
      if (user && user.token) {
        localStorage.setItem('user-token', user.token)
        navigate(from, { replace: true })
        setToken(user.token)
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.error
        ? error?.response?.data?.error
        : 'Something went wrong, please try again'

      setNotification({ message: errorMessage, type: 'error' })
    }
  }

  const isPasswordEqual = (first, second) => {
    if (first === second) return true
    else return false
  }

  

  useEffect(() => {
    const checkPasswordEquality = () => {
      if (isPasswordEqual(password, checkPassword)) {
        setPassword(password)
        setError(null)
        setButtonDisabled(false)
        return true
      } else {
        // show error
        setError('Password is not equal')
        setButtonDisabled(true)
        return false
      }
    }

    if (password && checkPassword && password.length === checkPassword.length) {
      checkPasswordEquality()
    } else {
      setButtonDisabled(true)
    }
  }, [password, checkPassword])

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
            value={email}
            placeholder="Email address"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            value={password}
            placeholder="Password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            value={checkPassword}
            placeholder="Repeat password"
            onInput={(e) => setCheckPassword(e.target.value)}
          />
          {error && <div className='error-message'>{error}</div>}
          <button className="button" onClick={signup} disabled={buttonDisabled}>
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
