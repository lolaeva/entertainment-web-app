import data from './data.json'
import ShowItem from './components/ShowItem'
import Nav from './components/Nav'
import Search from './components/Search'
import { useState } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

const GeneralSection = ({ showsData, title, searchText, isHomePage = false }) => {
  return (
    <section className="general-section">
      {!isHomePage && !searchText && (
        <h1>{!isHomePage && searchText ? `Search results for ${searchText}` : title}</h1>
      )}

      <div className="general-section-items">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={false} />
        ))}
      </div>
    </section>
  )
}

const TrendingSection = ({ showsData, searchText }) => {
  return (
    <section className="trending-section">
      <h1>{searchText ? `Search results for ${searchText}` : 'Trending'}</h1>
      <div className="trending-scroll-section">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={true} />
        ))}
      </div>
    </section>
  )
}

const Home = ({ showsData, searchText }) => {
  const trendingShows = showsData.filter((show) => show.isTrending)
  const generalShows = showsData.filter((show) => !show.isTrending)
  return (
    <>
      <TrendingSection showsData={trendingShows} searchText={searchText} />
      <GeneralSection
        showsData={generalShows}
        title="Recommended for you"
        searchText={searchText}
        isHomePage={true}
      />
    </>
  )
}

const NoPage = () => {
  return <div>No such page </div>
}

const Layout = ({ setSearchText, searchText }) => {
  const location = useLocation()
  const searchPlaceholder = `Search for ${
    location.pathname === '/tvseries'
      ? 'TV series'
      : location.pathname === '/bookmarks'
      ? 'bookmarked shows'
      : location.pathname === '/movies'
      ? 'movies'
      : 'movies or TV series'
  }`

  const handleSearch = (value) => {
    setSearchText(value)
  }

  return (
    <>
      <Nav />
      <main>
        <Search
          searchPlaceholder={searchPlaceholder}
          handleSearch={handleSearch}
          value={searchText}
        />
        <Outlet />
      </main>
    </>
  )
}

function App() {
  const [searchText, setSearchText] = useState('')
  let showsData = data.filter((s) => s.title.toLowerCase().includes(searchText.toLowerCase()))

  const movies = showsData.filter((show) => show.category === 'Movie')
  const tvSeries = showsData.filter((show) => show.category === 'TV Series')
  const bookmarkedShows = showsData.filter((show) => show.isBookmarked)

  return (
    <Routes className="App">
      <Route path="/" element={<Layout searchText={searchText} setSearchText={setSearchText} />}>
        <Route index element={<Home showsData={showsData} searchText={searchText} />} />
        <Route
          path="movies"
          element={<GeneralSection showsData={movies} title="Movies" searchText={searchText} />}
        />
        <Route
          path="tvseries"
          element={
            <GeneralSection showsData={tvSeries} title="TV Series" searchText={searchText} />
          }
        />
        <Route
          path="bookmarked"
          element={
            <GeneralSection
              showsData={bookmarkedShows}
              title="Bookmarked"
              searchText={searchText}
            />
          }
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
