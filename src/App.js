import showsData from './data.json'
import ShowItem from './components/ShowItem'
import Nav from './components/Nav'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Search from './components/Search'

const GeneralSection = ({ showsData }) => {
  return (
    <section className="general-section">
      {showsData.map((show) => (
        <ShowItem key={show.title} show={show} isTrendingPage={false} />
      ))}
    </section>
  )
}
const TrendingSection = ({ showsData }) => {
  return (
    <section className="trending-section">
      <div className="trending-scroll-section">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={true} />
        ))}
      </div>
    </section>
  )
}

const Home = ({ showsData }) => {
  const trendingShows = showsData.filter((show) => show.isTrending)
  const generalShows = showsData.filter((show) => !show.isTrending)
  return (
    <>
      <TrendingSection showsData={trendingShows} />
      <GeneralSection showsData={generalShows} />
    </>
  )
}

const NoPage = () => {
  return <>No such page </>
}

const Layout = () => {
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
  const handleSearch = () => {
    console.log('search')
  }
  return (
    <>
      <Nav />
      <main>
        <Search searchPlaceholder={searchPlaceholder} handleSearch={handleSearch} />
        <Outlet />
      </main>
    </>
  )
}

function App() {
  const movies = showsData.filter((show) => show.category === 'Movie')
  const tvSeries = showsData.filter((show) => show.category === 'TV Series')
  const bookmarkedShows = showsData.filter((show) => show.isBookmarked)
  return (
    <Routes className="App">
      <Route path="/" element={<Layout />}>
        <Route index element={<Home showsData={showsData} />} />
        <Route path="movies" element={<GeneralSection showsData={movies} />} />
        <Route path="tvseries" element={<GeneralSection showsData={tvSeries} />} />
        <Route path="bookmarked" element={<GeneralSection showsData={bookmarkedShows} />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
