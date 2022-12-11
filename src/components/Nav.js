import HomeIcon from '../assets/icons/icon-nav-home.svg'
import MoviesIcon from '../assets/icons/icon-nav-movies.svg'
import TvSeriesIcon from '../assets/icons/icon-nav-tv-series.svg'
import BookmarkIcon from '../assets/icons/icon-nav-bookmark.svg'
import Logo from '../assets/icons/logo.svg'
import Avatar from '../assets/icons/image-avatar.png'

const Nav = ({}) => {
  return (
    <div className="navigation">
      <nav>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="icons">
          <li>
            <img src={HomeIcon} alt="icon" />
          </li>
          <li>
            <img src={MoviesIcon} alt="icon" />
          </li>
          <li>
            <img src={TvSeriesIcon} alt="icon" />
          </li>
          <li>
            <img src={BookmarkIcon} alt="icon" />
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
