import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HomeIcon from '../assets/icons/icon-nav-home.svg'
import MoviesIcon from '../assets/icons/icon-nav-movies.svg'
import TvSeriesIcon from '../assets/icons/icon-nav-tv-series.svg'
import BookmarkIcon from '../assets/icons/icon-nav-bookmark.svg'
import Logo from '../assets/icons/logo.svg'
import Avatar from '../assets/icons/image-avatar.png'
import { NavLink } from 'react-router-dom'

const Nav = ({setToken}) => {
  const navigate = useNavigate()
  const [avatarSettings, setAvatarSettings] = useState(false)

  const showLogout = () => setAvatarSettings(!avatarSettings)

  document.addEventListener('click', (e) => {
    if (
      (avatarSettings === true && !e.target.nextElementSibling) ||
      (avatarSettings === true &&
        e.target.nextElementSibling &&
        !e.target.nextElementSibling.classList.contains('avatar__settings'))
    ) {
      setAvatarSettings(false)
    }
  })

  const logout = () => {
    localStorage.setItem('user-token', null)
    // navigate('/login', { replace: true })
    setToken(null)
  }

  return (
    <div className="navigation">
      <nav>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="icons">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'selected' : '')}>
              <img src={HomeIcon} alt="icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'selected' : '')}>
              <img src={MoviesIcon} alt="icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/tvseries" className={({ isActive }) => (isActive ? 'selected' : '')}>
              <img src={TvSeriesIcon} alt="icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmarked" className={({ isActive }) => (isActive ? 'selected' : '')}>
              <img src={BookmarkIcon} alt="icon" />
            </NavLink>
          </li>
        </ul>
        <div className="avatar" onClick={showLogout}>
          <img src={Avatar} alt="avatar" />
          <ul className={`avatar__settings ${!avatarSettings ? 'hidden' : ''}`}>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
