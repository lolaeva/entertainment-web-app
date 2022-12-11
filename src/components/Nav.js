import HomeIcon from '../assets/icons/icon-nav-home.svg'
import MoviesIcon from '../assets/icons/icon-nav-movies.svg'
import TvSeriesIcon from '../assets/icons/icon-nav-tv-series.svg'
import BookmarkIcon from '../assets/icons/icon-nav-bookmark.svg'
import Logo from '../assets/icons/logo.svg'
import Avatar from '../assets/icons/image-avatar.png'
import { NavLink } from 'react-router-dom'

const Nav = () => {
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
        <div className="avatar">
          <img src={Avatar} alt="avatar" />
        </div>
      </nav>
    </div>
  )
}

export default Nav
