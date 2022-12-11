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
        onChange={handleSearch}
        value={value}
        autoFocus
      />
    </div>
  )
}

export default Search
