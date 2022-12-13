import axios from 'axios'

const login = (data) => {
  const request = axios.post('/login', data)
  return request.then((response) => response.data)
}

const signup = (data) => {
  const request = axios.post('/signup', data)
  return request.then((response) => response.data)
}

export default {login, signup}