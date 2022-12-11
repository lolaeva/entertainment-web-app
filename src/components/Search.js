import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ searchPlaceholder, handleSearch, value }) => {
  return (
    <div className="search">
      <FontAwesomeIcon className="search-icon" icon={faSearch} />
      <input
        name="search"
        className="input search-input"
        type="search"
        placeholder={searchPlaceholder}
        onChange={({ target }) => handleSearch(target.value)}
        value={value}
        autoFocus
      />
    </div>
  )
}

export default Search
