import axios from 'axios'

const getAll = () => {
  const config = {
    headers: { Authorization: `bearer ${localStorage.getItem('user-token')}` },
  }
  const request = axios.get('/shows', config)
  return request.then((response) => response.data)
}

export default { getAll }
