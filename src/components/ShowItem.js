import { useState } from 'react'
import EmptyBookmarkIcon from '../assets/icons/icon-bookmark-empty.svg'
import FullBookmarkIcon from '../assets/icons/icon-bookmark-full.svg'
import MovieIcon from '../assets/icons/icon-category-movie.svg'
import TvIcon from '../assets/icons/icon-category-tv.svg'
import PlayIcon from '../assets/icons/icon-play.svg'

const ShowItem = ({ show, isTrendingPage, setBookmark }) => {
  const [bookmarkedStatus, setBookmarkedStatus] = useState(show.isBookmarked)
  let imgLink = isTrendingPage ? show.thumbnail.trending.large : show.thumbnail.regular.large
  imgLink = imgLink.replace('./assets/', '')

  const handleBookmark = () => {
    setBookmarkedStatus(!show.isBookmarked)
    setBookmark(show)
  }

  return (
    <div className={`item ${isTrendingPage ? 'trending' : ''}`}>
      <div className="item-background">
        <div className="item-background__button">
          <img src={PlayIcon} alt="Play icon" />
          <span>Play</span>
        </div>
      </div>
      <img className="item-image" src={imgLink} alt="show" />
      <div className="item-details">
        <div className="item-info">
          <p className="item-info__year">{show.year}</p>
          <div className="item-info__category">
            {show.category === 'Movie' ? (
              <img className="item-info__category-icon" src={MovieIcon} alt="" />
            ) : (
              <img className="item-info__category-icon" src={TvIcon} alt="" />
            )}
            <span>{show.category}</span>
          </div>
          <p className="item-info__rating">{show.rating}</p>
        </div>
        <p className="item-details__title">{show.title}</p>
      </div>
      <div className="item-bookmark" onClick={handleBookmark}>
        {bookmarkedStatus ? (
          <img src={FullBookmarkIcon} alt="Full bookmark icon" />
        ) : (
          <img src={EmptyBookmarkIcon} alt="Empty bookmark icon" />
        )}
      </div>
    </div>
  )
}

export default ShowItem
