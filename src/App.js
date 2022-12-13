import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import GeneralSection from './components/GeneralSection'
import Home from './components/Home'
import Nav from './components/Nav'
import Search from './components/Search'
import NoPage from './components/NoPage'
import Login from './components/Login'

import showsService from './services/showsService'

const getToken = (token) => {
  // const token = localStorage.getItem('user-token')

  if (token && token !== 'null' && token !== 'undefined') {
    const decodedToken = jwt_decode(token)
    const currentDate = new Date()

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false
    }
    return token
  } else {
    return false
  }
}

const RequireAuth = ({ children }) => {
  let location = useLocation()
  const token = localStorage.getItem('user-token')

  if (!getToken(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const LoginLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

const Layout = ({ setSearchText, searchText, setToken }) => {
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
    <RequireAuth>
      <Nav setToken={setToken} />
      <main>
        <Search
          searchPlaceholder={searchPlaceholder}
          handleSearch={handleSearch}
          value={searchText}
        />
        <Outlet />
      </main>
    </RequireAuth>
  )
}

function App() {
  const [searchText, setSearchText] = useState('')
  const [showsData, setShowsData] = useState([])
  const [token, setToken] = useState(localStorage.getItem('user-token'))

  useEffect(() => {
    if(getToken(token)) {
      showsService.getAll().then((shows) => {
        setShowsData(shows)
      })
    }
  }, [setShowsData, token])

  const setBookmark = (show) => {
    setShowsData(
      showsData.map((s) => (s.title !== show.title ? s : { ...s, isBookmarked: !s.isBookmarked }))
    )
  }

  const movies = showsData.filter((show) => show.category === 'Movie')
  const tvSeries = showsData.filter((show) => show.category === 'TV Series')
  const bookmarkedShows = showsData.filter((show) => show.isBookmarked)

  return (
    <Routes className="App">
      <Route path="/" element={<LoginLayout />}>
        <Route path="login" element={<Login setToken={setToken}/>} />
      </Route>
      <Route path="/" element={<Layout searchText={searchText} setSearchText={setSearchText} setToken={setToken} />}>
        <Route
          index
          element={<Home showsData={showsData} searchText={searchText} setBookmark={setBookmark} />}
        />
        <Route
          path="movies"
          element={
            <GeneralSection
              showsData={movies}
              title="Movies"
              searchText={searchText}
              setBookmark={setBookmark}
            />
          }
        />
        <Route
          path="tvseries"
          element={
            <GeneralSection
              showsData={tvSeries}
              title="TV Series"
              searchText={searchText}
              setBookmark={setBookmark}
            />
          }
        />
        <Route
          path="bookmarked"
          element={
            <GeneralSection
              showsData={bookmarkedShows}
              title="Bookmarked"
              searchText={searchText}
              setBookmark={setBookmark}
            />
          }
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
