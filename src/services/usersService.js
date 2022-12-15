import axios from 'axios'

const getOneUser = (userId) => {
  const config = {
    headers: { Authorization: `bearer ${localStorage.getItem('user-token')}` },
  }
  const request = axios.get(`/users/${userId}`, config)
  return request.then((response) => {
    return response.data
  })
}

const setBookmark = (userId, showId) => {
  const config = {
    headers: { Authorization: `bearer ${localStorage.getItem('user-token')}` },
  }
  const request = axios.put(`/users/${userId}`, {showId: showId}, config)
  return request.then((response) => {
    return response.data
  })
}

export default { getOneUser, setBookmark }
