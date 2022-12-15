import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Notification from './components/Notification'
import Nav from './components/Nav'
import Search from './components/Search'
import GeneralSection from './components/GeneralSection'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NoPage from './components/NoPage'

import showsService from './services/showsService'
import usersService from './services/usersService'

const getToken = (token) => {
  if (token && token !== 'null' && token !== 'undefined') {
    const decodedToken = jwt_decode(token)
    const currentDate = new Date()

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false
    }
    return decodedToken
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

const LoginLayout = ({ notification }) => {
  return (
    <>
      <Notification notification={notification} />
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
      <Notification />
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
  const [notification, setNotification] = useState({})
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('user-token'))

  useEffect(() => {
    const decodedToken = getToken(token)

    if (decodedToken) {
      setUser({ email: decodedToken.email, id: decodedToken.id })
      showsService.getAll().then((shows) => {
        usersService.getOneUser(decodedToken.id).then((user) => {
          user.bookmarkedShows.forEach((bookmarkedShow) => {
            shows.forEach((show) => {
              if (show.title === bookmarkedShow.title) {
                show.isBookmarked = true
              }
            })
          })
          setShowsData(shows)
        })
      })
    }
  }, [setShowsData, token])

  const setBookmark = async (show) => {
    usersService.setBookmark(user.id, show.id).then(() => {
      setShowsData(
        showsData.map((s) => (s.title !== show.title ? s : { ...s, isBookmarked: !s.isBookmarked }))
      )
    })
  }

  let timeoutID
  const handleNotification = (value) => {
    setNotification(value)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  const movies = showsData.filter((show) => show.category === 'Movie')
  const tvSeries = showsData.filter((show) => show.category === 'TV Series')
  const bookmarkedShows = showsData.filter((show) => show.isBookmarked)

  return (
    <Routes className="App">
      <Route path="/" element={<LoginLayout notification={notification} />}>
        <Route
          path="login"
          element={<Login setToken={setToken} setNotification={handleNotification} />}
        />
        <Route
          path="signup"
          element={<Signup setToken={setToken} setNotification={handleNotification} />}
        />
      </Route>
      <Route
        path="/"
        element={
          <Layout searchText={searchText} setSearchText={setSearchText} setToken={setToken} />
        }
      >
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
